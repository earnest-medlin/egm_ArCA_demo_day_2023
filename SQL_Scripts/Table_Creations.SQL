use Court_Case_Management
go

CREATE TABLE Cicuit (
                CircuitId INT IDENTITY NOT NULL, 
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
                CONSTRAINT LocationCode_pk PRIMARY KEY (LocationCode)
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
                CONSTRAINT CaseTypeCode_pk PRIMARY KEY (CaseTypeCode)
)

CREATE TABLE Person (
                PersonIdNumber INT IDENTITY NOT NULL,
                SystemId VARCHAR(30) NOT NULL,
				PersonEntity VARCHAR(4) NOT NULL,
				PersonTitle VARCHAR(30) NOT NULL, 
				PersonDescription VARCHAR(30),
				PersonLastName VARCHAR(30),
				PersonFirstName VARCHAR(30),
				PersonMiddileInitial VARCHAR(1),
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
                CONSTRAINT PersonIdNumber_pk PRIMARY KEY (PersonIdNumber)
)

CREATE TABLE Judge(
				SystemId VARCHAR(30) NOT NULL,
				CircuitId INT NOT NULL,
				JudgePersonIdNumber int NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL
)

CREATE TABLE CaseAssignmentRule(
				RuleNumber INT IDENTITY NOT NULL,		--Continue with RuleNumber
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
				PersonIdNumber INT NOT NULL,
				AssignmentPercentage INT NOT NULL,
				AssignmentPriority INT NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT JudgeAssignment_pk PRIMARY KEY (RuleNumber,PersonIdNumber)				
)

CREATE TABLE CircuitAssignment(
				CircuitCode VARCHAR(3) NOT NULL,
				SubjectMatterCode VARCHAR(2) NOT NULL,
				PersonIdNumber INT NOT NULL,
				AssignedInCircuit VARCHAR(1) NOT NULL,
				DateLastModified DATETIME NOT NULL,
				ModifiedByUserId VARCHAR(30) NOT NULL,
				CONSTRAINT RuleNumber_pk PRIMARY KEY (RuleNumber)
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
/*
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
--==================================================

ALTER TABLE County ADD CONSTRAINT County_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE Judge ADD CONSTRAINT Judge_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE Judge ADD CONSTRAINT Judge_PersonIdNumber_fk
FOREIGN KEY (JudgePersonIdNumber)
REFERENCES Person (PersonIdNumber)

ALTER TABLE Judge ADD CONSTRAINT Judge_SystemId_fk
FOREIGN KEY (SystemId)
REFERENCES Person (SystemId)

ALTER TABLE JudgeAssignmentDistribution ADD CONSTRAINT JudgeAssignmentDistribution_PersonIdNumber_fk
FOREIGN KEY (PersonIdNumber)
REFERENCES Person (PersonIdNumber)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_Circuit_fk
FOREIGN KEY (CircuitId)
REFERENCES Circuit (CircuitId)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_County_fk
FOREIGN KEY (CountyId)
REFERENCES County (CountyId)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_CourtCode_fk
FOREIGN KEY (CourtCode)
REFERENCES Court (CourtCode)

ALTER TABLE CaseAssignmentRule ADD CONSTRAINT CaseAssignmentRule_CaseTypeCode_fk
FOREIGN KEY (CaseTypeCode)
REFERENCES CaseType (CaseTypeCode)

ALTER TABLE CircuitAssignment ADD CONSTRAINT CircuitAssignment_PersonIdNumber_fk
FOREIGN KEY (PersonIdNumber)
REFERENCES Person (PersonIdNumber)

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