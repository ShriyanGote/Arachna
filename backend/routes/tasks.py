from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.schemas.object import Task
from backend.schemas.object import TaskResponse, TaskCreate
from backend.database.auth import get_current_user

router = APIRouter()

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()  # ✅ Ensure database commit
    return {"message": "Task deleted successfully"}



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


