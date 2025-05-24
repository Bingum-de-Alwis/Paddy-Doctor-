# Project Name

## Overview
This project is a comprehensive system for detecting and managing plant diseases, specifically focusing on paddy diseases. It consists of a frontend, backend, a paddy disease predictor, and a disease scraper.

## Project Structure
- **Frontend**: A React application built with Vite, using Tailwind CSS for styling.
- **Backend**: A Node.js application using Express, with MongoDB for data storage.
- **Paddy Disease Predictor**: A Python application using TensorFlow for disease prediction.
- **Disease Scraper**: A Node.js application for scraping disease data.

## Setup Instructions

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd project/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend
1. Navigate to the backend directory:
   ```bash
   cd project/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Paddy Disease Predictor
1. Navigate to the paddy disease predictor directory:
   ```bash
   cd project/paddy-disease-predictor
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use `env\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the application:
   ```bash
   python app.py
   ```

### Disease Scraper
1. Navigate to the disease scraper directory:
   ```bash
   cd project/DiseaseScraper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the scraper:
   ```bash
   npm start
   ```

## Usage
- The frontend provides a user interface for interacting with the system.
- The backend handles API requests and data storage.
- The paddy disease predictor uses machine learning to predict diseases from images.
- The disease scraper collects data from the web for analysis.

## License
This project is licensed under the ISC License.
