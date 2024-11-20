import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load your pre-trained model
model = tf.keras.models.load_model('model/model_detector_faces.keras')
class_labels = ['Fake', 'Real']

def predict_image(image_path):
    # Load and preprocess the image
    img = image.load_img(image_path, target_size=(128, 128), color_mode='rgb')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Make a prediction
    prediction = model.predict(img_array)
    
    # Extract the score (assuming binary classification, where score is in [0, 1])
    score = float(prediction[0][0])
    predicted_label = class_labels[int(score >= 0.5)]

    # Return both the label and the score
    return {
        "label": predicted_label,
        "score": score
    }