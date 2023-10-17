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

app=FastAPI()

@app.get('/')
def read_root():
    return {"Hello":"world"}


@app.post('/upload/')
async def create_upload_file():
   
    results = model(f"images/test.jpg", save=True, conf = 0.8)
    plot = results[0].plot()
   
    cv2.imwrite('img.jpg', plot)
    return  {"result": "success"}  