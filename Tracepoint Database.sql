
CREATE DATABASE tracepoint;
USE tracepoint;
CREATE TABLE cases(
	caseId int primary key auto_increment,
	casename varchar(255) not null,
	description varchar(255) not null,
	status VARCHAR(20) NOT NULL,
    CONSTRAINT CHK_UserRole CHECK (status IN ('OPEN', 'CLOSED', 'Standard'))
);

create table suspect(
	suspectid int primary key auto_increment,
	name varchar(255) not null,
	occupation varchar(255) not null,
	description varchar(255) not null
);

create table evidence(
	evidenceid int primary key auto_increment,
	title varchar(255) not null,
	description varchar(255) not null,
	location varchar(255) not null
);

create table investigations(
	investigationid int primary key auto_increment,
	caseid int not null,
	constraint fk_inv_caseid foreign key (caseId) references cases(caseId),
	suspectid int not null,
	constraint fk_inv_suspect foreign key (suspectid) references suspect(suspectid),
	conclusion varchar(255),
	datestarted datetime default current_timestamp
);

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);