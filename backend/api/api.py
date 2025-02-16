from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Arachna AI Engine is running!"}

@app.get("/tasks")
def get_tasks():
    return {"tasks": ["Task 1", "Task 2", "Task 3"]}

# Run this file using Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
