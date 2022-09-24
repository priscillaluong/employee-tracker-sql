const inquirer = require('inquirer');
const mysqlConnection = require('../config/connection');
const cTable = require('console.table');
const start = require('../index.js');

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const license = data.license;
  renderLicenseBadge(license);
  renderLicenseLink(license);
  renderLicenseSection(license);

  return `# ${data.title}
  ${licenseBadge}
  ## Table of Contents:
  1. [Description](#description)
  2. [Installation Instructions](#installation)
  
  3. [Usage Information](#usage)
  4. [Contribution Guidelines](#contribution)
  5. [Test Instructions](#test)
  6. [License](#license)
  7. [Questions](#questions)
  <a name="description"></a>
  ## Description:
  
  ${data.description}
  
  <a name="installation"></a>
  ## Installation Instructions:
  
  ${data.installation}
  
  <a name="usage"></a>
  ## Usage Information:
  
  ${data.usage}
  
  <a name="contribution"></a>
  ## Contribution Guidelines:
  
  ${data.contribution}
  
  <a name="test"></a>
  ## Test Instructions:
  
  ${data.test}
  
  <a name="license"></a>
  ## License (${license}):
  
  Copyright (C) 2022, ${data.name}
  ${licenseSection}
  
  <a name="questions"></a>
  ## Questions:
  
  You can find me on GitHub https://github.com/${data.github} or email me at ${data.email}
`;

}

function viewEmployeesByManager(){
    mysqlConnection.query('SELECT b.first_name AS manager_firstname, b.last_name AS manager_lastname, a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name = ? AND b.last_name = ?;', function (err, results) {
        console.table(results);
        start.start();
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
            viewEmployeesByManager();
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