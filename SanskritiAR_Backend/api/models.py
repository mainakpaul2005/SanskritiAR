# SanskritiAR_Backend/api/models.py

from sqlalchemy import Column, Integer, String
from .database import Base

class POI(Base):
    """
    SQLAlchemy model for a Point of Interest (POI).
    """
    __tablename__ = "pois"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    # --- CHANGE START ---
    # Replaced latitude and longitude with a 'direction' field.
    # The 'direction' field is set to unique to ensure there's only one of each cardinal direction.
    direction = Column(String, unique=True, index=True)
    # --- CHANGE END ---
    model_path = Column(String)