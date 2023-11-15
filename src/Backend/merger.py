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

    sub_image_array = []

    for result in results:

        print
        boxes=result.boxes
        # print(boxes.xyxy)
        crop_image(boxes.xyxy, plot)

    save_path = r"C:\Users\Akshat\UGP2023\Leaf_disease_detection\src\database\img.jpg"
    cv2.imwrite(save_path, plot)
    
    img_url = f"http://localhost:5000/images/img.jpg"
    # Save the result image
    
    # Send the result image as a response
    return jsonify({"img": img_url})

def crop_image(box_coordinates,img):
    # Iterate through each box and crop the corresponding region
    for i, box in enumerate(box_coordinates):
        # Extract box coordinates (assuming box is a tuple (x1, y1, x2, y2))
        x1, y1, x2, y2 = box
        x1=int(x1)
        x2=int(x2)
        y1=int(y1)
        y2=int(y2)

        # Crop the image
        cropped_img = img[y1:y2,x1:x2]

        root_dir = "C://Users//Akshat//UGP2023//Leaf_disease_detection//src//database"
        # Save the cropped image
        cv2.imwrite(f'{root_dir}//newimg{i}.jpg',cropped_img)

if __name__ == '__main__':
    app.run(debug=True)
 