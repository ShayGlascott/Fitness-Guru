from fastapi import FastAPI, HTTPException
from typing import List, Optional
import pymysql
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime


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
    StartTime: str 
    Date: str
    EndTime: str
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
    SELECT Progress.Date, Progress.StartTime, Progress.EndTime, Progress.Distance, Progress.Calories, Progress.Heartrate, Progress.Exercise
    FROM Progress
    JOIN Member_Progress ON Progress.ProgressID = Member_Progress.ProgressID
    WHERE Member_Progress.MemberID = %s
    """
    cursor.execute(query, (member_id,))
    progress_reports = cursor.fetchall()
    cursor.close()
    conn.close()
    
    progress_items = []
    for progress_data in progress_reports:
        progress_item = Progress(
            Date=str(progress_data['Date']),
            StartTime=str(progress_data['StartTime']),
            EndTime=str(progress_data['EndTime']),
            Distance=progress_data['Distance'],
            Calories=progress_data['Calories'],
            Heartrate=progress_data['Heartrate'],
            Exercise=progress_data['Exercise']
        )
        progress_items.append(progress_item)

    return progress_items



@app.post("/progress", response_model=Progress)
async def post_progress(progress: Progress, member_id: int):
    conn = db_connection()
    cursor = conn.cursor()
    
    current_date = datetime.now().date()
    
    cursor.execute(
        "INSERT INTO Progress (Date, StartTime, EndTime, Distance, Calories, Heartrate, Exercise) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (current_date, progress.StartTime, progress.EndTime, progress.Distance, progress.Calories, progress.Heartrate, progress.Exercise)
    )
    progress_id = cursor.lastrowid
    
    cursor.execute(
        "INSERT INTO Member_Progress (MemberID, ProgressID) VALUES (%s, %s)",
        (member_id, progress_id)
    )
    conn.commit()
    
    # Fetch the newly inserted progress record to return as response
    cursor.execute("SELECT * FROM Progress WHERE ProgressID = %s", (progress_id,))
    new_progress_data = cursor.fetchone()
    new_progress_data["StartTime"] = str(new_progress_data["StartTime"])
    new_progress_data["EndTime"] = str(new_progress_data["EndTime"])
    new_progress_data["Date"] = str(new_progress_data["Date"])

    cursor.close()
    conn.close()
    
    new_progress = Progress(**new_progress_data)
    
    return new_progress

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

    if current_tier == new_tier:
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


@app.post("/members/{member_id}/renew/{months}")
async def renew_membership(member_id: int, months: int):
    conn = db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT EndDate FROM Member WHERE MemberID = %s", (member_id,))
    current_end_date = cursor.fetchone()
    if current_end_date is None:
        cursor.close()
        conn.close()
        return {"message": "Member not found"}
    print(current_end_date)
    if current_end_date is not None:
        new_end_date = current_end_date['EndDate']
   
        if new_end_date:
            cursor.execute("UPDATE Member SET EndDate = DATE_ADD(EndDate, INTERVAL %s MONTH) WHERE MemberID = %s", (months, member_id))
            conn.commit()
        else:
            new_end_date = datetime.now()
            cursor.execute("UPDATE Member SET EndDate = DATE_ADD(%s, INTERVAL %s MONTH) WHERE MemberID = %s", (new_end_date, months, member_id))
            conn.commit()
    else:
        return {"message": "Current_end_date does not exist"}
    cursor.close()
    conn.close()
    return {"message": "Membership renewed successfully", "new_end_date": new_end_date.strftime("%Y-%m-%d")}


if __name__ == "__main__":
    uvicorn.run("__main__:app", host="0.0.0.0", port=8000, reload=True)