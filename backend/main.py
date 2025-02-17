from fastapi import FastAPI, Depends
from backend.database.auth import router as auth_router, get_current_user  # ✅ Import get_current_user
from backend.database.database import engine, Base


# Initialize DB
Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this if frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the auth router
app.include_router(auth_router)

@app.get("/protected")
def protected_route(user: dict = Depends(get_current_user)):
    return {"message": f"Hello, {user.name}. This is a protected route!"}

@app.get("/")
def home():
    return {"message": "Arachna API is running"}
