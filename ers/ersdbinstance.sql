DROP TABLE Employee;
DROP TABLE Ticket;

DELETE
FROM Employee;

DELETE
FROM Ticket;

commit;

CREATE TABLE Employee (
    Email VARCHAR2(50) NOT NULL,
    Name VARCHAR2(25) NOT NULL,
    Password VARCHAR2(25) NOT NULL,
    IsManager NUMBER(1) NOT NULL,
    ReportsTo VARCHAR2(50),
    CONSTRAINT PK_Employee PRIMARY KEY (Email)
);

CREATE TABLE Ticket (
    Id NUMBER(15) NOT NULL,
    Tdate TIMESTAMP NOT NULL,
    Amount NUMBER(25,2) NOT NULL,
    Category VARCHAR2(25),
    Status VARCHAR2(25) NOT NULL,
    Email VARCHAR2(50) NOT NULL,
    CONSTRAINT PK_Ticket PRIMARY KEY (Id)
);

ALTER TABLE Ticket ADD CONSTRAINT FK_TEmployee
    FOREIGN KEY (Email) REFERENCES Employee (Email);
    
ALTER TABLE Employee ADD CONSTRAINT FK_EReportsTo
    FOREIGN KEY (ReportsTo) REFERENCES Employee (Email);
    
INSERT INTO Ticket VALUES(1, timestamp '2018-08-21 04:01:00.00', 100.00, 'Recreational', 'approved', 'shimjay1@gmail.com');
INSERT INTO Ticket VALUES(2, timestamp '2018-08-21 04:02:00.00', 12.00, 'Travel', 'pending', 'shimjay1@gmail.com');
INSERT INTO Ticket VALUES(3, timestamp '2018-08-21 04:03:00.00', 623.22, 'Food', 'approved', 'shimjay1@gmail.com');
INSERT INTO Ticket VALUES(5, timestamp '2018-08-21 04:03:00.00', 623.22, 'Food', 'approved', 'shimjay1@gmail.com');
INSERT INTO Ticket VALUES(4, timestamp '2018-08-21 04:04:00.00', 82.00, 'Recreational', 'completed', 'alfonzo@gmail.com');

commit;

SELECT MAX(Id) AS "Top" FROM Ticket;