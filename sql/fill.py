import datetime
import os
import random
from dataclasses import dataclass

import names
import psycopg2


@dataclass
class Employee:
    name: str
    surname: str
    role: str
    birthdate: str
    salary: int

    def __str__(self) -> str:
        return f"('{self.name}', '{self.surname}', '{self.role}', '{self.birthdate}', {self.salary})"


roles = [
    'Junior Software Engineer',
    'Software Engineer',
    'Senior Software Engineer',
    'Lead Software Engineer',
]

def random_date() -> str:
    start_date = datetime.date(1950, 1, 1)
    end_date = datetime.date(2003, 2, 1)
    random_number_of_days = random.randrange((end_date - start_date).days)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return f'{random_date.year}-{random_date.month}-{random_date.day}'


def random_employees(N) -> list[Employee]:
    employees = []
    for _ in range(N):
        employees.append(Employee(
            name=names.get_first_name(),
            surname=names.get_last_name(),
            role=random.choice(roles),
            birthdate=random_date(),
            salary=random.randrange(0, 1000)
        ))
    return employees


def insert(employees: list[Employee]):
    conn = psycopg2.connect(os.environ['EMPLOYEES_PG_CONNECTION_STRING'])
    cursor = conn.cursor()

    values_str = ', '.join(str(employee) for employee in employees)
    cursor.execute('INSERT INTO employees(name, surname, role, birthdate, salary) VALUES ' + values_str)
    conn.commit()
    cursor.close()


if __name__ == '__main__':
    insert(random_employees(N=100))
