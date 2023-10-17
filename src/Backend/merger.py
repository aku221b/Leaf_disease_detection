# -*- coding: utf-8 -*-
"""
Created on Wed Sep 13 03:49:44 2023

@author: asus
"""

from typing import Union
from fastapi import FastAPI, File,UploadFile
import uuid
import cv2
import ultralytics
ultralytics.checks()
from ultralytics import YOLO
model = YOLO('best.pt')
IMAGEDIR="images/"

app=FastAPI()

@app.get('/')
def read_root():
    return {"Hello":"world"}


@app.post('/upload/')
async def create_upload_file(file: UploadFile=File(...)):
    file.filename=f"{uuid.uuid4()}.jpg"
    contents= await file.read()
    
    with open(f"{IMAGEDIR}{file.filename}","wb") as f:
        f.write(contents)

    results = model(f"{IMAGEDIR}{file.filename}", save=True, conf = 0.8)
    plot = results[0].plot()
   
    # cv2.imwrite('Prediction/img.JPG', plot)
    return  {"filename":file.filename, "output": plot}  