DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
    id serial primary key,
    name varchar(40) NOT NULL,
    surname varchar(40) NOT NULL,
    role varchar(40) NOT NULL,
    birthdate varchar(20) NOT NULL,
    salary int NOT NULL
);