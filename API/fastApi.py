from fastapi import FastAPI
import mysql.connector

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Membership management module
#   GET member profile
@app.get("/member/{member_id}")
def read_root():
    return "a"

#   GET tiers
@app.get("/member/tiers")

#   PUT payment info
@app.put("/items/{item_id}")



# Class scheduling module
#   GET class list
#   GET class detail
#   PUT enroll class
#   GET currently enrolled classes
#   GET previously enrolled classes


# Progress report module
#   GET goals
#   PUT new goal
#   GET progress graph
#   GET previously enrolled classes
#   GET download csv? file

