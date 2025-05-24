import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os

# === Load your trained model ===
model_path = 'model/paddy_disease_mobilenetv2.h5'
model = load_model(model_path)

# === Class labels ===
class_labels = ['Bacterial leaf blight', 'Bacterial leaf streak', 'Blast', 'Brown spot',
                'Dead heart', 'Downy mildew', 'Hispa', 'Normal', 'Tungro', 'Sheath blight']

# === Image preprocessing ===
def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# === Prediction function ===
def predict_image(img_path):
    img_tensor = preprocess_image(img_path)
    prediction = model.predict(img_tensor)
    predicted_class_index = np.argmax(prediction, axis=1)[0]
    predicted_class = class_labels[predicted_class_index]
    confidence = prediction[0][predicted_class_index]
    return predicted_class, confidence

# === Run a test ===
if __name__ == "__main__":
    test_image_path = 'images/test.jpg'  # Update with your local image path
    predicted_label, confidence = predict_image(test_image_path)
    print(f"✅ Predicted Class: {predicted_label}")
    print(f"🔍 Confidence: {confidence:.2f}")
