CREATE TABLE Member (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    MembershipTier VARCHAR(50)
);

CREATE TABLE Class (
    ClassID INT PRIMARY KEY
);

CREATE TABLE Member_Class (
    MemberID INT,
    ClassID INT,
    Date DATE,
    FitnessData VARCHAR(255),
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (ClassID) REFERENCES Class(ClassID),
    PRIMARY KEY (MemberID, ClassID)
);

-- Create Goal table
CREATE TABLE Goal (
    GoalID INT PRIMARY KEY,
    Goal VARCHAR(255)
);

CREATE TABLE Member_Goal (
    MemberID INT,
    GoalID INT,
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (GoalID) REFERENCES Goal(GoalID),
    PRIMARY KEY (MemberID, GoalID)
);
