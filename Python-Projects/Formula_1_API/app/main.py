from fastapi import FastAPI
from .routes import circuits,drivers
from .data_loader import load_circuits_data, load_drivers_data

app = FastAPI()

app.include_router(circuits.router)
app.include_router(drivers.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Formula 1 API!"}

@app.on_event("startup")
async def startup_event():
    load_circuits_data()
    load_drivers_data()
    print("Data loaded!")