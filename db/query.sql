/* Joining roles.department_id with department name from department table */
/* View all roles */

SELECT 
roles.id AS role_id,
roles.role_title, 
roles.salary,
department.department_name
FROM roles
JOIN department 
ON roles.department_id = department.id;

/* View all employees */

SELECT 
a.id AS employee_id,
a.first_name,
a.last_name, 
c.role_title,
d.department_name,
c.salary,
b.first_name AS manager_firstname,
b.last_name AS manager_lastname
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id;

/* View employees by manager */

SELECT 
b.first_name AS manager_firstname,
b.last_name AS manager_lastname,
a.id AS employee_id,
a.first_name,
a.last_name, 
c.role_title,
d.department_name,
c.salary
FROM employee a
LEFT JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id
INNER JOIN department d ON d.id = c.department_id
WHERE b.first_name = "John" AND b.last_name = "Doe";

/* Add department */

INSERT INTO department (department_name)
VALUES ("Talent");

/* Add a role */

INSERT INTO roles (role_title, salary, department_id)
VALUES ("Talent Executive", 75000, 5);

/* Add an employee */

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lam", 4, 3);

/* Update an employee role */

UPDATE employee SET role_id = 1
WHERE employee.first_name = "Mike" AND employee.last_name = "Chan";