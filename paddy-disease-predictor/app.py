from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from newprediction import predict_image, class_labels

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            predicted_class, confidence = predict_image(filepath)
            
            # Clean up the uploaded file
            os.remove(filepath)
            
            # Create a response that matches the frontend's expected structure
            return jsonify({
                'disease': {
                    'name': predicted_class,
                    'scientificName': predicted_class,  # You can add actual scientific names if available
                    'description': f'This is a {predicted_class} disease in paddy plants.',  # You can add actual descriptions
                    'id': predicted_class.lower().replace(' ', '-')
                },
                'confidence': float(confidence),
                'success': True
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 