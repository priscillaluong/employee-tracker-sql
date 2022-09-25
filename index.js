// TODO: Include packages needed for this application
const dbEnquiry = require('./db/index');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');

// TODO: Create an array of questions for user input
const startQuestion = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Department", 
            "Delete Role",
            "Delete Employee",
            "Quit"
        ]
    }
];

function start() {
    inquirer.prompt(startQuestion)
    .then((response) => {
        dbEnquiry(response.options);
    });
}

// TODO: Create a function to initialize app
function init() {
    start();
}

// Function call to initialize app
init();


exports.start = start;