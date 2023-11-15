import ultralytics
ultralytics.checks()
from ultralytics import YOLO
import cv2
model = YOLO('best.pt')

results = model('images/test.jpg', save = True)

for result in results:
    
    print(result.masks)

plot = results[0].plot()

cv2.imwrite("img.jpg", plot)