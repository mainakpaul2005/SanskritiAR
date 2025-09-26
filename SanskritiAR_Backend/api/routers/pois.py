from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import google.generativeai as genai
import os

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/pois",
    tags=["pois"],
)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel('gemini-pro')

@router.get("/{site_id}", response_model=List[schemas.POI])
def get_pois_for_site(site_id: int, db: Session = Depends(get_db)):
    pois = db.query(models.POI).filter(models.POI.site_id == site_id).all()
    if not pois:
        raise HTTPException(status_code=404, detail="POIs not found for this site")
    return pois

@router.get("/generate-content/{poi_id}")
def generate_poi_content(poi_id: int, db: Session = Depends(get_db)):
    """
    Generates dynamic content for a Point of Interest (POI) using the Gemini API. [cite: 25]
    """
    poi = db.query(models.POI).filter(models.POI.id == poi_id).first()
    if not poi:
        raise HTTPException(status_code=404, detail="POI not found")

    # Generate descriptive text directly from Gemini
    prompt = f"Generate a short, engaging historical fact or story for students about '{poi.name}' based on the context: {poi.description_prompt}"
    text_response = gemini_model.generate_content(prompt)
    
    # In a real app, you would call an image generation model here.
    # For the prototype, we can return a placeholder URL for the illustration.
    illustration_url = "https://via.placeholder.com/300" 
    
    return {
        "text": text_response.text,
        "illustration_url": illustration_url
    }