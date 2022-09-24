const inquirer = require('inquirer');
const mysqlConnection = require('../config/connection');
const cTable = require('console.table');
const start = require('../index.js');

/* const viewByManager = [
    {
        type: 'list',
        name: 'manager',
        message: 'Please select a manager:',
        choices: getManager()
        }
]; */

function viewEmployeesByManager(){
    mysqlConnection.query('SELECT b.first_name AS manager_firstname, b.last_name AS manager_lastname, a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name = ? AND b.last_name = ?;', [], function (err, results) {
        console.table(results);
        start.start();
    })
};

function getManager() {
    mysqlConnection.query('SELECT concat(b.first_name, " ", b.last_name) AS value, b.id AS id FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', function (err, results) {
        console.log(results);
        console.log(results[0]);
        let managers = []
        for (const manager in results) {
            console.log(results[manager].value)
/*             managers.push(results[manager]); */
        }
/*         console.log(managers); 
        return managers; */
        
    })
};

function viewAllEmployees(){
    mysqlConnection.query('SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id;', function (err, results) {
        console.table(results);
        start.start();
    })
};

function viewAllRoles(){
    mysqlConnection.query('SELECT roles.id AS role_id, roles.role_title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
        console.table(results);
        start.start();
    })
};

function viewAllDepartments(){
    mysqlConnection.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        start.start();
    })
};

function dbEnquiry(optionResponse) {
    switch(optionResponse) {
        case 'View All Departments':
            viewAllDepartments();
        break;
        case 'View All Roles':
            viewAllRoles();
        break;
        case 'View All Employees':
            viewAllEmployees();
        break;
        case 'View Employees By Manager':
            getManager();
/*             inquirer.prompt(viewByManager)
            .then((response) => {
                console.log(response);
            }); */
        break;
        case 'View Employees By Department':
            console.log("also correct");
        break;
        case 'Add Department':
            console.log("also correct");
        break;
        case 'Add Role':
            console.log("also correct");
        break;
        case 'Add Employee':
            console.log("also correct");
        break;
        case 'Update Employee Role':
            console.log("also correct");
        break;
        case 'Update Employee Manager':
            console.log("also correct");
        break;
        case 'Delete department, roles or employees':
            console.log("also correct");
        break;
        case 'Quit':
            console.log("also correct");
        break;
    };
}

module.exports = dbEnquiry;