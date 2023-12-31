USE Court_Case_Management
GO

/*Tables that need configuration
[X]-CaseType
[X]-Circuit
[X]-County
[X]-Court
[x]-Person
[x]-Attorney
[x]-CircuitJudge
*/

set identity_insert Circuit on;

INSERT INTO Circuit (CircuitId, CircuitCode, CircuitDescription, DateLastModified, ModifiedByUserId) VALUES
	(1,'01','1st Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(2,'02','2nd Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(3,'03','3rd Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(4,'04','4th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(5,'05','5th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(6,'06','6th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(7,'07','7th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(8,'08N','8th North Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(9,'08S','8th South Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(10,'09E','9th East Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(11,'09W','9th West Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(12,'10','10th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(13,'11E','11th East Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(14,'11W','11th West Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(15,'12','12th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(16,'13','13th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(17,'14','14th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(18,'15','15th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(19,'16','16th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(20,'17','17th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(21,'18E','18th East Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(22,'18W','18th West Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(23,'19E','19th East Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(24,'19W','19th West Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(25,'20','20th Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(26,'21','21st Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(27,'22','22nd Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN'),
	(28,'23','23rd Judicial Circuit',CURRENT_TIMESTAMP,'EGMEDLIN');

set identity_insert Circuit off;


INSERT INTO CaseType(CaseTypeCode, CaseTypeDescription, CaseTypeBeginDate, SubjectMatterIndicator, SubjectMatterCode, CaseTypeEndDate, DateLastModified, ModifiedByUserId ) VALUES
	('11','CRIMINAL CIRCUIT','1900-01-01','Y',null,null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DI','FELONY','1900-01-01','N','11',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('EX','EXTRADITION','1900-01-01','N','11',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('MA','MISDEMEANOR APPEAL','1900-01-01','N','11',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('MI','MISDEMEANOR','2017-01-01','N','11',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('12','CIVIL CIRCUIT','1900-01-01','Y',null,null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AP','ADMINISTRATIVE APPEAL','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR','PET TO SEAL ARREST RECORD','2022-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('BP','BUYER PLAINTIFF','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CD','CONDEMNATION/EMINENT DOMAIN','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CF','PROPERTY FORFEITURE','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DF','SLANDER/LIBEL/DEFAMATION','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DO','SELLER PLAINTIFF (DEBT COLL.)','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('EL','ELECTION','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('EM','EMPLOYMENT DISCRIMINATION','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('EO','EMPLOYMENT OTHER','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('FC','MORTGAGE FORECLOSURE','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('FR','FRAUD','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('FV','FOREIGN JUDGMENT-CIVIL','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('IJ','INJUNCTION','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('IT','INTENTIONAL TORT','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('LP','PREMISES LIABILITY','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('MO','MALPRACTICE - OTHER','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('MP','MALPRACTICE-MEDICAL','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('NM','AUTOMOBILE TORT','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('OC','CONTRACT - OTHER','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('OD','TORT-OTHER','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('OM','CIVIL - OTHER','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('PL','PRODUCT LIABILITY','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('QT','REAL PROPERTY - OTHER','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('TS','PET TRM SXOFF REGREQ OOST JMNT','2022-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('UD','LANDLORD/TENANT UNLAWFULDETAIN','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('UO','LANDLORD/TENANT OTHER','2017-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('WT','WRITS','1900-01-01','N','12',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('13','JUVENILE CIRCUIT','1900-01-01','Y',null,null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DN','DEPENDENT/NEGLECT','1900-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DX','DEPENDENT (NO FAULT)','2017-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('EJ','EXTENDED JUVENILE JURISDICTION','1900-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('FS','FAMILY IN NEED OF SERVICES','1900-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('JA','JUVENILE ADOPTION','1900-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('JD','DELINQUENCY','1900-01-01','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('OI','JUV ORDER OF INVESTIGATION','2017-06-14','N','13',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('14','DOMESTIC RELATIONS','1900-01-01','Y',null,null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AN','ANNULMENT','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CS','CUSTODY','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CT','CONTEMPT-DOMESTIC RELATIONS','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DA','ORDER OF PROTECTION','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DV','DIVORCE','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('FJ','FOREIGN JUDGMENT-DR','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('PT','PATERNITY','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('SM','SEPARATE MAINTENANCE','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('SS','SUPPORT - OCSE','2017-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('ST','SUPPORT - PRIVATE (NON OCSE)','2017-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('SU','SUPPORT-UIFSA','1900-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('VI','VISITATION','2017-01-01','N','14',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('15','PROBATE CIRCUIT','1900-01-01','Y',null,null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AA','ANCILLARY ADMINISTRATION','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AD','ADOPTION-PROBATE','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AL','ALCOHOLIC COMMITMENT','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AO','APS ORDER OF INVESTIGATION','2017-06-14','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CP','CONSERVATORSHIP','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CV','CIVIL COMMITMENT','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DC','NARCOTIC COMMITMENT','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('DE','DECEDENT ESTATE ADMINISTRATION','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('GA','GUARDIANSHIP OF AN ADULT','2017-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('GJ','GUARDIANSHIP OF A JUVENILE','2017-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('OP','PROBATE - OTHER','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('PC','ADULT PROTECTIVE CUSTODY','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('SE','SMALL ESTATE','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('TA','TRUST ADMINISTRATION','1900-01-01','N','15',null,CURRENT_TIMESTAMP,'EGMEDLIN');
	
INSERT INTO COUNTY (CountyId, CountyName, CircuitId, DateLastModified, ModifiedByUserId) VALUES
	('01','ARKANSAS',13,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('02','ASHLEY',12,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('03','BAXTER',17,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('04','BENTON',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('05','BOONE',17,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('06','BRADLEY',12,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('07','CALHOUN',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('08','CARROLL',23,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('09','CHICOT',12,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('10','CLARK',10,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('11','CLAY',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('12','CLEBURNE',19,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('13','CLEVELAND',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('14','COLUMBIA',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('15','CONWAY',18,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('16','CRAIGHEAD',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('17','CRAWFORD',26,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('18','CRITTENDEN',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('19','CROSS',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('20','DALLAS',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('21','DESHA',12,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('22','DREW',12,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('23','FAULKNER',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('24','FRANKLIN',5,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('25','FULTON',19,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('26','GARLAND',21,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('27','GRANT',7,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('28','GREENE',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('29','HEMPSTEAD',8,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('30','HOT SPRING',7,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('31','HOWARD',11,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('32','INDEPENDENCE',19,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('33','IZARD',19,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('34','JACKSON',3,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('35','JEFFERSON',14,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('36','JOHNSON',5,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('37','LAFAYETTE',9,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('38','LAWRENCE',3,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('39','LEE',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('40','LINCOLN',14,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('41','LITTLE RIVER',11,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('42','LOGAN',18,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('43','LONOKE',28,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('44','MADISON',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('45','MARION',17,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('46','MILLER',9,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('47','MISSISSIPPI',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('48','MONROE',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('49','MONTGOMERY',22,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('50','NEVADA',8,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('51','NEWTON',17,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('52','OUACHITA',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('53','PERRY',6,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('54','PHILLIPS',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('55','PIKE',11,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('56','POINSETT',2,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('57','POLK',22,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('58','POPE',5,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('59','PRAIRIE',20,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('60','PULASKI',6,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('61','RANDOLPH',3,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('62','ST. FRANCIS',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('63','SALINE',27,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('64','SCOTT',18,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('65','SEARCY',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('66','SEBASTIAN',15,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('67','SEVIER',11,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('68','SHARP',3,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('69','STONE',19,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('70','UNION',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('71','VAN BUREN',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('72','WASHINGTON',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('73','WHITE',20,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('74','WOODRUFF',1,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('75','YELL',18,CURRENT_TIMESTAMP,'EGMEDLIN');

INSERT INTO COURT( CourtCode, CourtDescription, DateLastModified, ModifiedByUserId) VALUES
	('CI','CIRCUIT',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('CO','COUNTY',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('JV','JUVENILE',CURRENT_TIMESTAMP,'EGMEDLIN');

set identity_insert Person on;

INSERT INTO Person(PersonIdNumber, PersonLastName, PersonFirstName, PersonMiddleInitial, DateLastModified, ModifiedByUserId) VALUES
	('100000','KEATON','EDWIN','A',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100001','SCHRANTZ','R','DOUGLAS',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100002','FOSTER','HARRY','G',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100003','SCOTT','JOHN','RUSSELL',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100004','DUNCAN','XOLLIE','MARIE BUFFER',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100005','LINDSAY','MARK',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100006','THOMASON','MARY',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100007','TALLEY','DAVID','W',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100008','HUCKABEE','PARKER','SANDERS',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100009','ZIMMERMAN','STACEY','A',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100010','THREET','JOHN','CARL',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100011','KARREN','BRADLEY','LEWIS',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100012','GREEN','ROBIN','FROMAN',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100013','TAYLOR','JOANNA','BOYLES',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100014','CLARK','DAVID','M',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100015','HORWART','CHRISTINE',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100016','ELMORE','BARBARA',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100017','SMITH','THOMAS','E',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100018','CARROLL','ROBIN','J',CURRENT_TIMESTAMP,'EGMEDLIN'),		--Check Validity of this Judge
	('100019','GRAHAM','DAVID','C',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100020','WARREN','DIANE','BARTSCH',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100021','MARTIN','WILLIAM','DOUGLAS',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100022','BRYAN','ELIZABETH','STOREY',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100023','PARKER','JASON','ASHLEY',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100024','SINGLETON','SPENCER','GRADY',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100025','BEAUMONT','CRISTI','RENEE',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100026','WEAVER','SUSAN','KAYE',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100027','BRASWELL','TROY','B',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('100028','CLAWSON','CHARLES','EDWARD',CURRENT_TIMESTAMP,'EGMEDLIN');

set identity_insert Person off;

INSERT INTO Attorney(AttorneyId, PersonIdNumber,	DateLastModified, ModifiedByUserId) VALUES
	('AR1006745','100022',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006706','100021',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1004317','100008',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1602635','100026',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006670','100020',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1005482','100012',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002044','100001',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1005044','100011',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1007543','100024',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1005636','100013',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1603030','100027',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1007323','100023',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1003125','100007',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1004802','100010',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002701','100006',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006502','100019',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006131','100018',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006041','100017',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1007557','100025',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002166','100002',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1005901','100015',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR4057650','100028',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1004463','100009',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002495','100005',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002003','100000',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002364','100004',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1002243','100003',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1005721','100014',CURRENT_TIMESTAMP,'EGMEDLIN'),
	('AR1006002','100016',CURRENT_TIMESTAMP,'EGMEDLIN');

	
INSERT INTO CircuitJudge(JudgeId, AttorneyId, CircuitId, DateLastModified, ModifiedByUserId) VALUES
	('C13D01','AR1006502',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C13D02','AR1002701',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C13D03','AR1002003',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C13D04','AR1006131',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C13D05','AR1003125',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C13D06','AR1007543',16,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C20D01','AR1602635',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C20D02','AR1603030',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C20D03','AR4057650',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C20D04','AR1005721',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C20D05','AR1002166',25,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D01','AR1006706',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D02','AR1004802',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D03','AR1004463',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D04','AR1007557',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D05','AR1006745',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D06','AR1002495',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D07','AR1005636',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C04D08','AR1006670',4,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C23D01','AR1006002',28,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C23D02','AR1007323',28,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C23D03','AR1004317',28,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD01','AR1005482',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD02','AR1005044',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD03','AR1006041',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD04','AR1002243',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD05','AR1002364',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD06','AR1002044',24,CURRENT_TIMESTAMP,'EGMEDLIN'),
	('C19WD07','AR1005901',24,CURRENT_TIMESTAMP,'EGMEDLIN');

set identity_insert CaseAssignmentRule on;
	
INSERT INTO CaseAssignmentRule(RuleNumber, CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, RuleEndDate,	DateLastModified, ModifiedByUserId) VALUES
	(1000,28,'43','CI','14','W','2013-12-06',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1001,28,'43','CI','12','W','2017-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1002,28,'43','CI','11','W','2020-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1003,28,'43','CI','DA','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1004,28,'43','CI','SS','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1005,28,'43','CI','ST','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1006,28,'43','CI','SU','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1007,28,'43','CO','15','W','2015-04-02',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1008,28,'43','JV','DN','W','2022-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1009,28,'43','JV','DX','W','2022-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1010,28,'43','JV','JA','W','2022-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1011,28,'43','JV','OI','W','2013-12-06',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1012,28,'43','JV','EJ','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1013,28,'43','JV','JD','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN'),
	(1014,28,'43','JV','FS','W','2021-01-01',null,CURRENT_TIMESTAMP,'EGMEDLIN');
	
set identity_insert CaseAssignmentRule off;	

INSERT INTO JudgeAssignmentDistribution(RuleNumber, JudgeId, AssignmentPercentage, AssignmentPriority,	DateLastModified,	ModifiedByUserId) VALUES
(1002,'C23D01',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1002,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1002,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1001,'C23D03',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1001,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1001,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1000,'C23D02',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1000,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1000,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1008,'C23D01',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1008,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1008,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1009,'C23D01',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1009,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1009,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1010,'C23D01',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1010,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1010,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1007,'C23D03',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1007,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1007,'C23D02',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1012,'C23D02',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1012,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1012,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1014,'C23D02',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1014,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1014,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1013,'C23D02',100,1,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1013,'C23D01',0,2,CURRENT_TIMESTAMP,'EGMEDLIN'),
(1013,'C23D03',0,2,CURRENT_TIMESTAMP,'EGMEDLIN');



