from pydantic import BaseModel
from typing import List, Optional

# Base schema for a POI
class POIBase(BaseModel):
    name: str
    description_prompt: str

# Schema for creating a POI
class POICreate(POIBase):
    pass

# Schema for reading a POI (includes ID)
class POI(POIBase):
    id: int
    site_id: int
    
    class Config:
        orm_mode = True

# Schema for reading a Heritage Site, including its list of POIs
class HeritageSite(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    pois: List[POI] = []

    class Config:
        orm_mode = True