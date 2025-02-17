from fastapi import FastAPI, Depends
from backend.database.auth import get_current_user
from backend.database.database import Base, engine
from backend.database.auth import router as auth_router
from backend.routes.tasks import router as task_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Arachna AI Engine is running!"}

@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": f"Hello, {user.name}. This is a protected route!"}

# Include Authentication & Task Routes
app.include_router(auth_router)
app.include_router(task_router)

# Run FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.api:app", host="127.0.0.1", port=8000, reload=True)
