/* Joining roles.department_id with department name from department table */

SELECT 
roles.id AS role_id,
roles.role_title, 
roles.salary,
department.department_name
FROM roles
JOIN department 
ON roles.department_id = department.id;

/* Joining roles.department_id with department name from department table */

SELECT 
a.id AS employee_id,
a.first_name,
a.last_name, 
c.role_title,
/* department.department_name, */
c.salary,
b.first_name AS manager_firstname,
b.last_name AS manager_lastname
FROM employee a
INNER JOIN employee b ON a.manager_id = b.id
INNER JOIN roles c ON a.role_id = c.id;
/* JOIN department ON department.id = roles.department_id; */

/* SELECT 
*
FROM employee
JOIN roles ON employee.role_id = roles.id;
INNER JOIN employee ON employee.manager_id = manager.id;
JOIN department ON department.id = Roles.department_id; */