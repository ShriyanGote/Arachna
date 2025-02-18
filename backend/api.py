from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from backend.database.auth import get_current_user
from backend.database.database import Base, engine
from backend.database.auth import router as auth_router
from backend.routes.tasks import router as task_router

# ✅ Initialize database tables
Base.metadata.create_all(bind=engine)

# ✅ Initialize FastAPI app (only once)
app = FastAPI()

# ✅ CORS Middleware (Fixes CORS & 405 OPTIONS issues)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change * to a specific domain if needed
    allow_credentials=True,
    allow_methods=["*"],  # Ensure all HTTP methods are allowed
    allow_headers=["*"],  # Allow all headers
)

# ✅ Root Route
@app.get("/")
def read_root():
    return {"message": "Arachna AI Engine is running!"}

# ✅ Protected Route (Testing authentication)
@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": f"Hello, {user.name}. This is a protected route!"}

# ✅ Include Authentication & Task Routes
app.include_router(auth_router, tags=["Authentication"])
app.include_router(task_router, tags=["Tasks"])

# ✅ Run FastAPI Server (Ensure this is the entry point)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.api:app", host="127.0.0.1", port=8000, reload=True)
