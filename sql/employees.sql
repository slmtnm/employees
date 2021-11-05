DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id serial primary key,
    email varchar(60) NOT NULL,
    name varchar(40),
    surname varchar(40),
    role varchar(40)
);

INSERT INTO employees(email, name, surname, role) VALUES
    ('petya@mail.ru', 'Petr', 'Petrov', 'QA'),
    ('ivan@yandex.ru', 'Ivan', 'Ivanov', 'Frontend'),
    ('maksim@yahoo.com', 'Maksim', 'Maksimov', 'Backend'),
    ('andrey@mail.ru', 'Andrey', 'Andreev', 'DB'),
    ('viktor@yandex.ru', 'Viktor', 'Viktorov', 'DBA');