DROP TABLE Employee;
DROP TABLE Ticket;

DELETE
FROM Employee;

DELETE
FROM Ticket;

commit;

CREATE TABLE Employee (
    Email VARCHAR2(50) NOT NULL,
    Username VARCHAR2(25) NOT NULL,
    Password VARCHAR2(25) NOT NULL,
    CONSTRAINT PK_Employee PRIMARY KEY (Email)
);

CREATE TABLE Ticket (
    Id VARCHAR2(100) NOT NULL,
    Amount NUMBER(25,2) NOT NULL,
    Category VARCHAR2(25),
    Status VARCHAR2(25) NOT NULL,
    Email VARCHAR2(50) NOT NULL,
    CONSTRAINT PK_Ticket PRIMARY KEY (Id)
);

ALTER TABLE Ticket ADD CONSTRAINT FK_TEmployee
    FOREIGN KEY (Email) REFERENCES Employee (Email);
    