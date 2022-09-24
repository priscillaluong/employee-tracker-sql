// TODO: Include packages needed for this application
const dbEnquiry = require('./db/index');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
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

const updateEmployeeQ = [
    {
        type: 'list',
        name: 'updateEmployee',
        message: 'Select an employee to update:',
        choices: [

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