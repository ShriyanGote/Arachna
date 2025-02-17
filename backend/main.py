from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.tasks import router as task_router
from backend.database.auth import get_current_user

app = FastAPI()

# ✅ CORS Middleware (Fixes 405 OPTIONS issue)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict domains (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Ensure all methods are allowed (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # ✅ Allow frontend headers
)

@app.get("/")
def read_root():
    return {"message": "Arachna AI Engine is running!"}

@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": f"Hello, {user.name}. This is a protected route!"}

# ✅ Include API Routes (AFTER adding CORS)
app.include_router(task_router)

# Run FastAPI with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
