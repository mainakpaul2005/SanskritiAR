# SanskritiAR_Backend/api/schemas.py

from pydantic import BaseModel

class POIBase(BaseModel):
    """
    Base Pydantic schema for a POI.
    """
    name: str
    description: str | None = None
    # --- CHANGE START ---
    # Replaced latitude and longitude with a 'direction' field.
    direction: str
    # --- CHANGE END ---
    model_path: str

class POICreate(POIBase):
    """
    Pydantic schema for creating a new POI.
    """
    pass

class POI(POIBase):
    """
    Pydantic schema for reading a POI from the database.
    """
    id: int

    class Config:
        orm_mode = True