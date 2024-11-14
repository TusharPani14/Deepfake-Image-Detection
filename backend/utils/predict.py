import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load your pre-trained model
model = tf.keras.models.load_model('model/model_detector_faces.keras')
class_labels = ['Fake', 'Real']

def predict_image(image_path):
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=(128, 128), color_mode='rgb')  # Ensure RGB mode
    img_array = image.img_to_array(img) 
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Debug: Check the shape and type of the input
    print(f"Processed image shape: {img_array.shape}")
    print(f"Processed image data type: {img_array.dtype}")

    # Make a prediction
    prediction = model.predict(img_array)

    # Debug: Print raw prediction score
    print(f"Raw prediction score: {prediction}")

    # Assuming prediction is a single scalar (probability) for binary classification
    predicted_label = class_labels[int(prediction[0][0] >= 0.5)]
    print(f"Predicted label: {predicted_label}")
    
    return predicted_label