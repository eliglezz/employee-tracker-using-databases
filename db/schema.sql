DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT REFERENCES department(id) ON DELETE SET NULL 
);

CREATE TABLE employees(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT REFERENCES role(id) ON DELETE SET NULL,
manager_id INT DEFAULT NULL REFERENCES employees(id) ON DELETE SET NULL 
);