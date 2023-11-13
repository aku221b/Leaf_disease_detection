# -*- coding: utf-8 -*-
from flask import Flask, request, send_file, jsonify
from flask import send_from_directory
import cv2
import ultralytics

app = Flask(__name__)

# Ultralytics initialization
ultralytics.checks()
from ultralytics import YOLO
model = YOLO('best.pt')

# Enable CORS
from flask_cors import CORS

CORS(app, resources={r"/upload/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def read_root():
    return jsonify({"Hello": "world"})

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(r'C:\Users\Akshat\UGP2023\Leaf_disease_detection\src\database', filename)

@app.route('/upload/', methods=['POST'])
def create_upload_file():
    # Perform YOLO detection
    results = model('images/test.jpg', save = True)
    plot = results[0].plot()

    save_path = r"C:\Users\Akshat\UGP2023\Leaf_disease_detection\src\database\img.jpg"
    cv2.imwrite(save_path, plot)
    
    img_url = f"http://localhost:5000/images/img.jpg"
    # Save the result image

    # Send the result image as a response
    return jsonify({"img": img_url})

if __name__ == '__main__':
    app.run(debug=True)
 