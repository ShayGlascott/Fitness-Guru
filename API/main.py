from fastapi import FastAPI, HTTPException
from typing import List, Optional
import pymysql
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import date, time


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8100"],  # Update this with the origin of your frontend
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def db_connection():
    try:
        conn = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="FuckY0u2002",
            database="fitness_guru",
            cursorclass=pymysql.cursors.DictCursor  
        )
        return conn
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL: {e}")
        return None


# # Class Models for Request and Response
class Class(BaseModel):
    classID: Optional[int]
    className: str
    date: str
    startTime: str
    endTime: str
    instructor: str

class Progress(BaseModel):
    Date: str
    Time: str
    Distance: float
    Calories: int
    Heartrate: int
    Exercise: str

class Member(BaseModel):
    MemberID: int
    Name: str
    StartDate: str
    EndDate: str
    MembershipTier: int

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

    class_items = []
    for class_data in classes:
        try:
            class_item = Class(
                classID=class_data["ClassID"],

                className=class_data["Name"],  
                date=str(class_data["Date"]),  
                startTime=str(class_data["StartTime"]),
                endTime=str(class_data["EndTime"]),  
                instructor=class_data["Instructor"]  
            )
            class_items.append(class_item)
        except KeyError as e:
            print(f"KeyError: {e}. Class data: {class_data}")

    return class_items

@app.get("/schedule/{member_id}", response_model=List[Class])
async def get_schedule(member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    query = """
    SELECT Class.ClassID, Class.Name, Class.Date, Class.StartTime, Class.EndTime, Class.Instructor
    FROM Class
    JOIN Member_Class ON Class.ClassID = Member_Class.ClassID
    WHERE Member_Class.MemberID = %s
    """
    cursor.execute(query, (member_id,))
    schedule = cursor.fetchall()
    cursor.close()
    conn.close()
    
    schedule_items = []
    for class_data in schedule:
        try:
            
            class_item = Class(
                classID=class_data["ClassID"],
                className=class_data["Name"],
                date=str(class_data["Date"]),
                startTime=str(class_data["StartTime"]),
                endTime=str(class_data["EndTime"]),
                instructor=class_data["Instructor"]
            )
            schedule_items.append(class_item)
        except KeyError as e:
            print(f"KeyError: {e}. Class data: {class_data}")

    return schedule_items

@app.post("/classes/{member_id}/{class_id}")
async def post_class(member_id: int, class_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM Member_Class WHERE MemberID = %s AND ClassID = %s", (member_id, class_id))
    if cursor.fetchone() is not None:
        cursor.close()
        conn.close()
        return {"message": "Class already added to schedule"}

    cursor.execute("INSERT INTO Member_Class (MemberID, ClassID) VALUES (%s, %s)", (member_id, class_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Class added to schedule successfully"}


@app.delete("/classes/{member_id}/{class_id}")
async def remove_class(member_id: int, class_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM Member_Class WHERE MemberID = %s AND ClassID = %s", (member_id, class_id))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return {"message": "Class not found in schedule"}

    cursor.execute("DELETE FROM Member_Class WHERE MemberID = %s AND ClassID = %s", (member_id, class_id))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Class removed from schedule successfully"}


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


@app.get("/member/{member_id}", response_model=Member)
async def get_member(member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Member WHERE MemberID = %s", (member_id,))
    member = cursor.fetchone()
    cursor.close()
    conn.close()
    
    member["StartDate"] = member["StartDate"].strftime("%Y-%m-%d")
    member["EndDate"] = member["EndDate"].strftime("%Y-%m-%d")
    
    return member



if __name__ == "__main__":
    uvicorn.run("__main__:app", host="0.0.0.0", port=8000, reload=True)