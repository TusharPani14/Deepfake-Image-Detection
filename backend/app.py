from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from utils.predict import predict_image
import uvicorn
from pathlib import Path

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the route for health check
@app.get("/")
def read_root():
    return {"message": "Deepfake Detection API is running"}

# Endpoint to upload an image and get prediction
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    temp_file_path = Path("uploaded_image.jpg")
    with temp_file_path.open("wb") as buffer:
        buffer.write(await file.read())
    
    # Run prediction
    result = predict_image(str(temp_file_path))
    
    # Remove the temporary file
    temp_file_path.unlink()
    
    return {"prediction": result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
