// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown.js')
const inquirer = require('inquirer');
const fs = require('fs');

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
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role"
        ]
    }
];

const addDepartmentQ = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Please enter name of department:'
    }
];

const addRoleQ = [
    {
        type: 'input',
        name: 'role',
        message: 'Please enter name of role:'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter salary of role:',
        validate: (answer) => {
            if (isNaN(answer)) {
              return "Please enter numbers only:";
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'department',
        message: 'Please enter the role department:'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log('Successfully created README.md!')
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            const readMeContent = generateMarkdown(answers);
            writeToFile("README.md", readMeContent);
        });
}

// Function call to initialize app
init();