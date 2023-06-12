USE Court_Case_Management
GO

CREATE TABLE Circuit (
                CircuitId INT IDENTITY(1,1) NOT NULL, 
                CircuitCode VARCHAR(3) NOT NULL,
				CircuitDescription VARCHAR(40) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT Circuit_pk PRIMARY KEY (CircuitId)
)

CREATE TABLE County (
                CountyId VARCHAR(2) NOT NULL,
                CountyName VARCHAR(15) NOT NULL,
				CircuitId INT NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT County_pk PRIMARY KEY (CountyId)
)

CREATE TABLE Court (
                CourtCode VARCHAR(2) NOT NULL,
                CourtDescription VARCHAR(30) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT Court_pk PRIMARY KEY (CourtCode)
)

CREATE TABLE CaseType (
                CaseTypeCode VARCHAR(2) NOT NULL,
                CaseTypeDescription VARCHAR(30) NOT NULL,
				CaseTypeBeginDate DATE NOT NULL,
				SubjectMatterIndicator VARCHAR(1) NOT NULL,
				SubjectMatterCode VARCHAR(2),
				CaseTypeEndDate DATE,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT CaseType_pk PRIMARY KEY (CaseTypeCode)
)

CREATE TABLE Person (
                PersonIdNumber INT IDENTITY(100000,1) NOT NULL,
                PersonLastName VARCHAR(30),
				PersonFirstName VARCHAR(30),
				PersonMiddleInitial VARCHAR(30),
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT Person_pk PRIMARY KEY (PersonIdNumber)
)

CREATE TABLE Attorney(
				AttorneyId VARCHAR(30) NOT NULL,
				PersonIdNumber INT NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL
				CONSTRAINT Attorney_pk PRIMARY KEY (AttorneyId)
)

CREATE TABLE CircuitJudge(
				JudgeId VARCHAR(30) NOT NULL,
				AttorneyId VARCHAR(30) NOT NULL,
				CircuitId INT NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL
				CONSTRAINT CircuitJudge_pk PRIMARY KEY (JudgeId)				
)

CREATE TABLE CaseAssignmentRule(
				RuleNumber INT IDENTITY(1000,1) NOT NULL,
				CircuitId INT NOT NULL,
				CountyId VARCHAR(2) NOT NULL,
				CourtCode VARCHAR(2) NOT NULL,
				CaseTypeCode VARCHAR(2) NOT NULL,
				AssignmentMethod VARCHAR(1) NOT NULL,
				RuleBeginDate DATE NOT NULL,
				RuleEndDate DATE,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT RuleNumber_pk PRIMARY KEY (RuleNumber)
)

CREATE TABLE JudgeAssignmentDistribution(
				RuleNumber INT NOT NULL,
				JudgeId VARCHAR(30) NOT NULL,
				AssignmentPercentage INT NOT NULL,
				AssignmentPriority INT NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT JudgeAssignmentDistribution_pk PRIMARY KEY (RuleNumber,JudgeId)				
)

--==================================================

CREATE TABLE AssignmentRuleSubmission(
				RuleNumber INT NOT NULL,
				SequenceNumber INT NOT NULL,
				Approved VARCHAR(1) NOT NULL,
				Comments VARCHAR(300) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT AssignmentRuleSubmission_pk PRIMARY KEY (RuleNumber,SequenceNumber)				
)

--==================================================

CREATE TABLE CircuitAssignment(
				CircuitId INT NOT NULL,
				SubjectMatterCode VARCHAR(2) NOT NULL,
				JudgeId VARCHAR(30) NOT NULL,
				AssignedInCircuit VARCHAR(1) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT CircuitAssignment_pk PRIMARY KEY (CircuitId, SubjectMatterCode,JudgeId)
)

--==================================================
/* Possibly out of Project Scope
CREATE TABLE CCMUser(
				UserId VARCHAR(30) NOT NULL,
				FirstName VARCHAR(30) NOT NULL,
				LastName VARCHAR(30) NOT NULL,
				Email VARCHAR(80),
				PhoneAreaCode VARCHAR(3),
				PhoneNumber VARCHAR(7),
				CountyId VARCHAR(2) NOT NULL,
				CourtCode VARCHAR(2) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT UserId_pk PRIMARY KEY (UserId)
)

CREATE TABLE CCMUserSecurity(
				UserId VARCHAR(30) NOT NULL,
				CountyId VARCHAR(2) NOT NULL,
				CourtCode VARCHAR(2) NOT NULL,
				CaseTypeCode VARCHAR(2) NOT NULL,
				QueryOnly VARCHAR(1) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT UserSecurity_pk PRIMARY KEY (UserId,CountyId,CourtCode,CaseTypeCode)
)
*/

/* Out of Project Scope
CREATE TABLE JudgeAssignmentPool(
)
*/
--==================================================

ALTER TABLE County ADD CONSTRAINT County_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE CircuitJudge ADD CONSTRAINT CicuitJudge_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE CircuitJudge ADD CONSTRAINT CircuitJudge_Attorney_fk
FOREIGN KEY (AttorneyId)
REFERENCES Attorney (AttorneyId)

ALTER TABLE Attorney ADD CONSTRAINT Attorney_Person_fk
FOREIGN KEY (PersonIdNumber)
REFERENCES Person (PersonIdNumber)

ALTER TABLE JudgeAssignmentDistribution ADD CONSTRAINT JudgeAssignmentDistribution_CircuitJudge_fk
FOREIGN KEY (JudgeId)
REFERENCES CircuitJudge (JudgeId)

ALTER TABLE JudgeAssignmentDistribution ADD CONSTRAINT JudgeAssignmentDistribution_CaseAssignmentRule_fk
FOREIGN KEY (RuleNumber)
REFERENCES CaseAssignmentRule (RuleNumber)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_County_fk
FOREIGN KEY (CountyId)
REFERENCES County (CountyId)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_Court_fk
FOREIGN KEY (CourtCode)
REFERENCES Court (CourtCode)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_CaseType_fk
FOREIGN KEY (CaseTypeCode)
REFERENCES CaseType (CaseTypeCode)

ALTER TABLE AssignmentRuleSubmission ADD CONSTRAINT AssignmentRuleSubmission_CaseAssignmentRule_fk
FOREIGN KEY (RuleNumber)
REFERENCES CaseAssignmentRule (RuleNumber)

ALTER TABLE CircuitAssignment ADD CONSTRAINT CircuitAssignment_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE CircuitAssignment ADD CONSTRAINT CircuitAssignment_CircuitJudge_fk
FOREIGN KEY (JudgeId)
REFERENCES CircuitJudge (JudgeId)

--========================================================

/*
ALTER TABLE CCMUser ADD CONSTRAINT CCMUser_County_fk
FOREIGN KEY (CountyId)
REFERENCES County (CountyId)

ALTER TABLE CCMUserSecurity ADD CONSTRAINT CCMUserSecurity_County_fk
FOREIGN KEY (CountyId)
REFERENCES County (CountyId)

ALTER TABLE CCMUser ADD CONSTRAINT CCMUser_CourtCode_fk
FOREIGN KEY (CourtCode)
REFERENCES Court (CourtCode)

ALTER TABLE CCMUserSecurity ADD CONSTRAINT CCMUserSecurity_CourtCode_fk
FOREIGN KEY (CourtCode)
REFERENCES Court (CourtCode)

ALTER TABLE CCMUserSecurity ADD CONSTRAINT CCMUserSecurity_CaseTypeCode_fk
FOREIGN KEY (CaseTypeCode)
REFERENCES CaseType (CaseTypeCode)

*/