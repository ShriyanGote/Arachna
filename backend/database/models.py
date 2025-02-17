from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy import Boolean

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    tasks = relationship("Task", back_populates="user")  # ✅ Ensure this exists




from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)  # ✅ Ensure this exists
    completed = Column(Boolean, default=False)   # ✅ Ensure this exists
    user_id = Column(Integer, ForeignKey("users.id"))  # ✅ ForeignKey linking to User

    user = relationship("User", back_populates="tasks")  # ✅ This ensures the relationship

