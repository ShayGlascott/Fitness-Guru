from fastapi import FastAPI, HTTPException
from typing import List
import mysql.connector
from pydantic import BaseModel

app = FastAPI()

# Database Connection Configuration
def db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="your_username",
        password="your_password",
        database="Fitness_guru"
    )

# Class Models for Request and Response
class Class(BaseModel):
    ClassID: int
    Name: str
    Instructor: str
    Date: str
    StartTime: str
    EndTime: str

class Progress(BaseModel):
    Date: str
    Time: str
    Distance: float
    Calories: int
    Heartrate: int
    Exercise: str

# Endpoints
@app.get("/")
async def root():
    return {"message": "Hello World from Fitness Guru"}

@app.get("/classes", response_model=List[Class])
async def get_classes():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Class")
    classes = cursor.fetchall()
    cursor.close()
    conn.close()
    return classes

@app.get("/schedule/{member_id}", response_model=List[Class])
async def get_schedule(member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    query = """
    SELECT Class.* FROM Class
    JOIN Member_Class ON Class.ClassID = Member_Class.ClassID
    WHERE Member_Class.MemberID = %s
    """
    cursor.execute(query, (member_id,))
    schedule = cursor.fetchall()
    cursor.close()
    conn.close()
    return schedule

@app.post("/classes/{member_id}/{class_id}")
async def post_class(member_id: int, class_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Member_Class (MemberID, ClassID) VALUES (%s, %s)", (member_id, class_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Class added to member successfully"}

@app.get("/progress/{member_id}", response_model=List[Progress])
async def get_progress(member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    query = """
    SELECT Progress.* FROM Progress
    JOIN Member_Progress ON Progress.ProgressID = Member_Progress.ProgressID
    WHERE Member_Progress.MemberID = %s
    """
    cursor.execute(query, (member_id,))
    progress_reports = cursor.fetchall()
    cursor.close()
    conn.close()
    return progress_reports

@app.post("/progress", response_model=Progress)
async def post_progress(progress: Progress, member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Progress (Date, Time, Distance, Calories, Heartrate, Exercise) VALUES (%s, %s, %s, %s, %s, %s)",
                   (progress.Date, progress.Time, progress.Distance, progress.Calories, progress.Heartrate, progress.Exercise))
    progress_id = cursor.lastrowid
    cursor.execute("INSERT INTO Member_Progress (MemberID, ProgressID) VALUES (%s, %s)", (member_id, progress_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Progress added successfully", "ProgressID": progress_id}

@app.post("/members/{member_id}/tier/{new_tier}")
async def post_tier(member_id: int, new_tier: int):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT MembershipTier FROM Member WHERE MemberID = %s", (member_id,))
    current_tier = cursor.fetchone()
    if current_tier is None:
        cursor.close()
        conn.close()
        return {"message": "Member not found"}

    if current_tier[0] == new_tier:
        cursor.close()
        conn.close()
        return {"message": "No change made to the membership tier"}

    cursor.execute("UPDATE Member SET MembershipTier = %s WHERE MemberID = %s", (new_tier, member_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Membership tier updated successfully"}


@app.get("/member/{member_id}", response_model=Class)
async def get_member(member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Member WHERE MemberID = %s", (member_id,))
    member = cursor.fetchone()
    cursor.close()
    conn.close()
    return member

