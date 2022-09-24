const inquirer = require('inquirer');
const mysqlConnection = require('../config/connection');
const cTable = require('console.table');
const start = require('../index.js');
let managersArr = [];
let departmentsArr = [];
let rolesArr = [];

const getManagerQ = [
    {
        type: 'list',
        name: 'manager',
        message: 'Please select a manager:',
        choices: managersArr
    }
];

const getDepartmentQ = [
    {
        type: 'list',
        name: 'department',
        message: 'Please select a department:',
        choices: departmentsArr
    }
];

const addDepartmentQ = [
    {
        type: 'input',
        name: 'department',
        message: 'Please enter name of department:'
    }
];

const addRoleQs = [
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
        type: 'list',
        name: 'department',
        message: 'Which department does the role belong to?',
        choices: departmentsArr
    }
];

const addEmployeeQs = [
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
        type: 'list',
        name: 'role',
        message: "Please select employee's role:",
        choices: rolesArr
    },
    {
        type: 'list',
        name: 'manager',
        message: "Please select employee's manager:",
        choices: managersArr
    }
];

//////////////////////////////////// QUIT ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function quit () {
    //prompt.ui.close();
}

//////////////////////// DELETE DEP, ROLES OR EMPLOYEES /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


////////////////////////// UPDATE EMPLOYEE MANAGER //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


////////////////////////// UPDATE EMPLOYEE ROLE /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


////////////////////////////// ADD AN EMPLOYEE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function addEmployee(fName, lName, role, manager) {
    let roleId = '';
    let managerId = '';
    const managerName = manager.split(" ");

    switch (manager) {
        case 'None':
        break;
        default:
            mysqlConnection.query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', [managerName[0], managerName[1]], function (err, results) {
                managerId = results[0].id;
            })
    }

    mysqlConnection.query('SELECT id FROM roles WHERE role_title = ?', role, function (err, results) {
        roleId = results[0].id;   
    })
    mysqlConnection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [fName, lName, roleId, managerId], function (err, results) {
        console.log("This employee has been successfully added to the database!");
        start.start();  
    })
}

function addEmployeePrompt(){
    mysqlConnection.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', function (err, results) {
        for (const person in results) {
            managersArr.push(results[person].manager_name);
        }
        managersArr.push("None");
    });    
    mysqlConnection.query('SELECT role_title FROM roles', function (err, results) {
        for (const role in results) {
            rolesArr.push(results[role].role_title);
        }       
    });
    inquirer.prompt(addEmployeeQs)
    .then((response) => {
        addEmployee(response.fName, response.lName, response.role, response.manager);
    });
}

//////////////////////////////// ADD NEW ROLE ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function addRole(role, salary, department) {
    let getDepartmentId = '';
    mysqlConnection.query('SELECT id FROM department WHERE department_name = ?', department, function (err, results) {
        getDepartmentId = results[0].id;
        console.log(getDepartmentId);     
    })
    mysqlConnection.query("INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?);", [role, Number(salary), 2], function (err, results) {
        console.log(typeof(role));
        console.log(typeof(Number(salary)));
        console.log(getDepartmentId);
        console.log(results);
        console.log(err);
        console.log("This new role has been successfully added to the database!");
        start.start();  
    })
}

function addRolePrompt(){
    mysqlConnection.query('SELECT department_name FROM department', function (err, results) {
        for (const department in results) {
            departmentsArr.push(results[department].department_name);
        }       
    })
    inquirer.prompt(addRoleQs)
    .then((response) => {
        addRole(response.role, response.salary, response.department);
    });
}

//////////////////////////////// ADD DEPARTMENT /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function addDepartment(department) {
    console.log("This is the result:" + department)
    mysqlConnection.query('INSERT INTO department (department_name) VALUES (?);', department, function (err, results) {
        console.log(`${department} has been successfully added to departments.`);
        start.start();
    })
}

function addDepartmentPrompt() {
    inquirer.prompt(addDepartmentQ)
    .then((response) => {
        addDepartment(response.department);
    });
}

///////////////////////// VIEW EMPLOYEES BY DEPARTMENT //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function viewEmployeesByDepartment (department) {
    mysqlConnection.query('SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE d.department_name = ?;', department, function (err, results) {
        console.table(results);
        start.start();
    })
};

function departmentPromptToView() {
    inquirer.prompt(getDepartmentQ)
    .then((response) => {
        viewEmployeesByDepartment(response.department);
    });
}

function getDepartmentToView (){
    mysqlConnection.query('SELECT department_name FROM department', function (err, results) {
        for (const department in results) {
            departmentsArr.push(results[department].department_name);
        }
        departmentPromptToView();        
    })
}

////////////////////// VIEW EMPLOYEES BY MANAGER ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function viewEmployeesByManager(firstName, lastName){
    mysqlConnection.query('SELECT b.first_name AS manager_firstname, b.last_name AS manager_lastname, a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name = ? AND b.last_name = ?;', [firstName, lastName], function (err, results) {
        console.table(results)
        start.start();
    })
};

function managerPrompt() {
    inquirer.prompt(getManagerQ)
    .then((response) => {
        let fullName = response.manager;
        const splitName = fullName.split(" ");
        viewEmployeesByManager(splitName[0], splitName[1]);
    });
}

function getManager() {
    mysqlConnection.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', function (err, results) {
        for (const person in results) {
            managersArr.push(results[person].manager_name);
        }
        managerPrompt();        
    })
};

///////////////////////////// VIEW ALL EMPLOYEES ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function viewAllEmployees(){
    mysqlConnection.query('SELECT a.id AS employee_id, a.first_name, a.last_name, c.role_title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id;', function (err, results) {
        console.table(results)
        start.start();
    })
};

///////////////////////////// VIEW ALL ROLES /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function viewAllRoles(){
    mysqlConnection.query('SELECT roles.id AS role_id, roles.role_title, roles.salary, department.department_name FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
        console.table(results)
        start.start();
    })
};

/////////////////////////// VIEW ALL DEPARTMENTS ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function viewAllDepartments(){
    mysqlConnection.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        start.start();
    })
};

///////////////////////////// START FUNCTION ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

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
        break;
        case 'View Employees By Department':
            getDepartmentToView();
        break;
        case 'Add Department':
            addDepartmentPrompt();
        break;
        case 'Add Role':
            addRolePrompt();
        break;
        case 'Add Employee':
            addEmployeePrompt();
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
            quit();
        break;
    };
}

module.exports = dbEnquiry;