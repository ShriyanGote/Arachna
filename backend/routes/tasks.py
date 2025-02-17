from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.auth import get_current_user
from backend.database.database import get_db
from backend.database.models import Task
from pydantic import BaseModel

router = APIRouter()

# Task Schema
class TaskCreate(BaseModel):
    title: str

class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool

# ✅ Get all tasks for the logged-in user
@router.get("/tasks", response_model=list[TaskResponse])
def get_tasks(user=Depends(get_current_user), db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.user_id == user.id).all()
    return tasks  # Returning list of tasks directly

# ✅ Create a new task
@router.post("/tasks", response_model=TaskResponse)
def create_task(task: TaskCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    new_task = Task(title=task.title, user_id=user.id, completed=False)  # Ensure completed field
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# ✅ Delete a task
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
