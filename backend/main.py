from fastapi import FastAPI
from backend.database.auth import router as auth_router
from backend.database.database import engine, Base

# Initialize DB
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Arachna API is running"}
