from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

class HeritageSite(Base):
    __tablename__ = "heritage_sites"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    description = Column(Text)
    
    pois = relationship("POI", back_populates="site")

class POI(Base):
    __tablename__ = "pois"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description_prompt = Column(Text)
    position_x = Column(Float, default=0.0)
    position_y = Column(Float, default=0.0)
    position_z = Column(Float, default=-1.5) # Default 1.5m in front of the user
    site_id = Column(Integer, ForeignKey("heritage_sites.id"))

    site = relationship("HeritageSite", back_populates="pois")