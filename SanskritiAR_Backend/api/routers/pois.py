from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import google.generativeai as genai
import os
from .. import models, schemas
from ..database import get_db

router = APIRouter(tags=["Content Generation"])

# Configure the Gemini API client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel('gemini-pro')

@router.get("/pois/generate-content/{poi_id}")
def generate_poi_content(poi_id: int, db: Session = Depends(get_db)):
    """
    Generates dynamic, historical content for a Point of Interest (POI)
    using the Gemini API.
    """
    poi = db.query(models.POI).filter(models.POI.id == poi_id).first()
    if not poi:
        raise HTTPException(status_code=404, detail="POI not found")

    prompt = f"Generate a short, engaging, family-friendly historical fact about '{poi.name}' based on this context: {poi.description_prompt}"
    
    try:
        response = gemini_model.generate_content(prompt)
        # For the prototype, we return a placeholder for the illustration.
        illustration_url = "https://via.placeholder.com/300"
        
        return {
            "text": response.text,
            "illustration_url": illustration_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate content from Gemini API: {str(e)}")