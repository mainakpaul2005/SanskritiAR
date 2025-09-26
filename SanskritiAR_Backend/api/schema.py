from pydantic import BaseModel
from typing import Optional

class POIBase(BaseModel):
    name: str
    description_prompt: str
    ar_anchor_id: Optional[str] = None
    position_x: float
    position_y: float
    position_z: float

class POI(POIBase):
    id: int
    site_id: int
    class Config:
        orm_mode = True