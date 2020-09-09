DROP DATABASE IF EXISTS CMS_db;
CREATE DATABASE CMS_db;
USE CMS_db;

CREATE TABLE department(
id int auto_increment,
name varchar(30),
primary key(id)
);

CREATE TABLE role(
id int auto_increment,
title varchar(30) not null,
salary int(6) not null,
department_id int not null,
primary key (id)
);

CREATE TABLE employee(
id int auto_increment,
first_name varchar(30)not null,
last_name varchar(30)not null,
role_id int not null,
manager_id int,
primary key (id)
);
INSERT INTO department (name) values("marketing"),("QA"),("development");
INSERT INTO role(title,salary,department_id) values("social media manager", 33000, 1), ("social media peon",29000,1),("QA lead",43000,2),("QA whipping boy",35000,2),("software developer", 45000, 3),("software developee",35000, 3);
INSERT INTO employee(first_name,last_name,role_id) VALUES("Gork","McGork",1),("Pattycake","Shepard",3),("Bob", "Bifford",5);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES("AAAAAAAAA", "AAAAAAAA", 2, 1),("Beefy","McLarge-Huge",4,2),("Griff","Oberwold",6,3);
select * from department;
