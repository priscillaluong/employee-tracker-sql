// TODO: Include packages needed for this application
const dbEnquiry = require('./db/index');
const inquirer = require('inquirer');
/* const mysqlConnection = require('./config/connection');
const cTable = require('console.table');
const logo = require('asciiart-logo'); */
/* 
// renaming column to total_count, looking at data from favourite_books table, COUNTING by in_stock group. 
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
    console.log(results);
});

// renaming column to total_in_section, looking at data from favourite_books table, COUNTING by in_stock group. 
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
    console.log(results);
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); */


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
            "Delete department, roles or employees",
            "Quit"
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

const addEmployeeQ = [
    {
        type: 'input',
        name: 'fName',
        message: "Please enter employee's first name:"
    },
    {
        type: 'input',
        name: 'lName',
        message: "Please enter employee's last name:"
    },
    {
        type: 'input',
        name: 'employeeRole',
        message: "Please enter employee's role:"
    },
    {
        type: 'input',
        name: 'employeeManager',
        message: "Please enter employee's manager:"
    }
];

const updateEmployeeQ = [
    {
        type: 'list',
        name: 'updateEmployee',
        message: 'Select an employee to update:',
        choices: [

        ]
    }
];

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(startQuestion)
        .then((response) => {
            dbEnquiry(response.options);
        });
}

// Function call to initialize app
init();

/* 
"View All Roles",
"View All Employees",
"Add Department",
"Add Role",
"Add Employee",
"Update Employee Role",
"Quit" */