from fastapi import FastAPI
from fastapi import Depends
from backend.database.auth import get_current_user


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Arachna AI Engine is running!"}

@app.get("/tasks")
def get_tasks():
    return {"tasks": ["Task 1", "Task 2", "Task 3"]}



@app.get("/protected")
def protected_route(user: dict = Depends(get_current_user)):
    return {"message": f"Hello, {user.name}. This is a protected route!"}


# Run this file using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
