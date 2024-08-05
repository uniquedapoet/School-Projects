from pydantic import BaseModel, Field

class Circuit(BaseModel):
    circuitId: int
    circuitRef: str
    name: str
    location: str
    country: str
    lat: float
    lng: float
    alt: float
    fastest_lap: str = Field(default=None, description="Fastest lap time")

    @classmethod
    def from_data(cls, data):
        """Class method to create a circuit instance from raw data"""
        return cls(
            circuitId=data["circuitId"],
            circuitRef=data["circuitRef"],
            name=data["name"],
            location=data["location"],
            country=data["country"],
            lat=data["lat"],
            lng=data["lng"],
            alt=data["alt"],
        )
