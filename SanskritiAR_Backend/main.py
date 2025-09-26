from fastapi import FastAPI
from api.routers import pois, analytics
from api.database import engine, Base

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SanskritiAR API")

app.include_router(pois.router)
# app.include_router(analytics.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the SanskritiAR Backend for SIH 2025!"}