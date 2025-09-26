from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from .database import Base

class POI(Base):
    __tablename__ = "pois"
    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, ForeignKey("heritage_sites.id"))
    name = Column(String(255), index=True)
    description_prompt = Column(Text)
    ar_anchor_id = Column(String(255), nullable=True)
    position_x = Column(Float)
    position_y = Column(Float)
    position_z = Column(Float)