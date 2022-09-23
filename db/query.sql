/* Joining roles.department_id with department name from department table */

SELECT 
roles.id AS role_id,
roles.role_title, 
roles.salary,
department.department_name AS department
FROM roles
JOIN department 
ON roles.department_id = department.id;