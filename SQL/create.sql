CREATE TABLE Member (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    MembershipTier INT
);

CREATE TABLE Class (
    ClassID INT PRIMARY KEY,
    Name VARCHAR(100),
    Instructor VARCHAR(100),
    Date DATE,
    StartTime TIME,
    EndTime TIME
);

CREATE TABLE Member_Class (
    MemberID INT,
    ClassID INT,
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (ClassID) REFERENCES Class(ClassID),
    PRIMARY KEY (MemberID, ClassID)
);

CREATE TABLE Progress (
    ProgressID INT PRIMARY KEY,
    Date DATE,
    EndTime TIME,
    StartTime TIME,
    Distance FLOAT,
    Calories INT,
    Heartrate INT,
    Exercise VARCHAR(100)
);

CREATE TABLE Member_Progress (
    MemberID INT,
    ProgressID INT,
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (ProgressID) REFERENCES Progress(ProgressID),
    PRIMARY KEY (MemberID, ProgressID)
);
