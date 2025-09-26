from fastapi import FastAPI
from api.database import engine, Base
from api.routers import pois

# This line creates your database tables based on the models
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SanskritiAR API",
    description="API for the Smart India Hackathon 2025 Cultural Heritage Project."
)

# Include the POI router
app.include_router(pois.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the SanskritiAR API!"}