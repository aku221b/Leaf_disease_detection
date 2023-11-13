# -*- coding: utf-8 -*-
from flask import Flask, request, send_file, jsonify
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

@app.route('/upload/', methods=['POST'])
def create_upload_file():
    # Perform YOLO detection
    results = model('images/test.jpg', save = True)
    plot = results[0].plot()

    # Save the result image
    cv2.imwrite('img.jpg', plot)

    # Send the result image as a response
    return send_file('img.jpg')

if __name__ == '__main__':
    app.run(debug=True)
 