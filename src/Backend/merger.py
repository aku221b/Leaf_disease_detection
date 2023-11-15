# -*- coding: utf-8 -*-
from flask import Flask, request, send_file, jsonify
from flask import flash ,redirect, url_for
from werkzeug.utils import secure_filename
import time
from urllib.parse import urlparse


from flask import send_from_directory
import cv2
import ultralytics
import os

root_dir = "D://New folder//Leaf_disease_detection//src//database"
mapped_dir = "http://localhost:5000/images"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = 'D://New folder//Leaf_disease_detection//src//database'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = "super_secret"
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# Ultralytics initialization
ultralytics.checks()
from ultralytics import YOLO
model = YOLO('best.pt')

# Enable CORS
from flask_cors import CORS

CORS(app, resources={r"/upload/*": {"origins": "http://localhost:3000"},
                     r"/rgbToGrayScale/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def read_root():
    return jsonify({"Hello": "world"})

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('D://New folder//Leaf_disease_detection//src//database', filename)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload/', methods=['POST'])
def create_upload_file():
    # Perform YOLO detection
    if 'image' not in request.files:
        flash('No image part')
        print('No image part')
        return jsonify({"img": "bad request"})
    
    file = request.files['image']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        print('No selected file')
        return jsonify({"img": "bad request"})
    
    if file and allowed_file(file.filename):

        print("i am here")

        filename = file.filename

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        file.save(file_path)

        image = cv2.imread(file_path)

        height = image.shape[0]
        width = image.shape[1]

        start_time = time.time()

        results = model(image, save = True)

        end_time = time.time()

        elapsed_time = round(end_time - start_time, 2)

        plot = results[0].plot()

        sub_image_array = []

        for result in results:

            boxes=result.boxes
            # print(boxes.xyxy)
            sub_image_array = crop_image(boxes.xyxy, plot)

        save_path = f"{app.config['UPLOAD_FOLDER']}//img.jpg"

        cv2.imwrite(save_path, plot)
        
        img_url = f"{mapped_dir}/img.jpg"
        # Save the result image
        
        # Send the result image as a response
        return jsonify({"img": img_url, "image_array": sub_image_array, 'elapsed_time': elapsed_time, "height": height, "width": width})

@app.route('/rgbToGrayScale/', methods=['POST'])
def convert_to_rgb():
        
       data = request.json  # Access the JSON data from the request body
       selected_image = data.get('image')  # Access the 'image' property from the JSON data
       print(selected_image)
       parsed_url = urlparse(selected_image)
       filename = os.path.basename(parsed_url.path)
       image = cv2.imread(f"{root_dir}//{filename}")
       grayscale_image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

       save_path = f"{app.config['UPLOAD_FOLDER']}//greyscale.jpg"

       cv2.imwrite(save_path, grayscale_image)
        
       img_url = f"{mapped_dir}/greyscale.jpg"
        # Save the result image

       return jsonify({"img": img_url})    
       
def crop_image(box_coordinates,img):
    # Iterate through each box and crop the corresponding region
    image_array = []
    for i, box in enumerate(box_coordinates):
        # Extract box coordinates (assuming box is a tuple (x1, y1, x2, y2))
        x1, y1, x2, y2 = box
        x1=int(x1)
        x2=int(x2)
        y1=int(y1)
        y2=int(y2)

        # Crop the image
        cropped_img = img[y1:y2,x1:x2]
        # Save the cropped image

        img_path = f'{root_dir}//newimg{i}.jpg'

        cv2.imwrite(img_path,cropped_img)

        image_array.append(f"{mapped_dir}/newimg{i}.jpg")

    return image_array 

if __name__ == '__main__':
    app.run(debug=True)
 