# SanskritiAR_Backend/api/routers/pois.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.POI)
def create_poi(poi: schemas.POICreate, db: Session = Depends(get_db)):
    """
    Create a new POI.
    """
    db_poi = models.POI(**poi.dict())
    db.add(db_poi)
    db.commit()
    db.refresh(db_poi)
    return db_poi

@router.get("/", response_model=list[schemas.POI])
def read_pois(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get a list of all POIs.
    """
    pois = db.query(models.POI).offset(skip).limit(limit).all()
    return pois

# --- CHANGE START ---
# Added a new endpoint to fetch a POI by its direction.
@router.get("/direction/{direction_name}", response_model=schemas.POI)
def read_poi_by_direction(direction_name: str, db: Session = Depends(get_db)):
    """
    Get a POI by its direction (e.g., "North", "South").
    """
    db_poi = db.query(models.POI).filter(models.POI.direction == direction_name).first()
    if db_poi is None:
        raise HTTPException(status_code=404, detail="POI for this direction not found")
    return db_poi
# --- CHANGE END ---

@router.get("/{poi_id}", response_model=schemas.POI)
def read_poi(poi_id: int, db: Session = Depends(get_db)):
    """
    Get a POI by its ID.
    """
    db_poi = db.query(models.POI).filter(models.POI.id == poi_id).first()
    if db_poi is None:
        raise HTTPException(status_code=404, detail="POI not found")
    return db_poi