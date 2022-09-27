// TODO: Repeated data is pushed into arrays (from different prompts and same prompts)
// TODO: QUIT function 
// TODO: Await / Await - promise.then()

const inquirer = require('inquirer');
const mysqlConnection = require('../config/connection');
const cTable = require('console.table');
const start = require('../index.js');
const logo = require('asciiart-logo');

let managersArr = [];
let departmentsArr = [];
let rolesArr = [];
let employeesArr = [];

///////////////////////////// Question Arrays //////////////////////////////
////////////////////////////////////////////////////////////////////////////

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

const updateEmployeeQ = [
    {
        type: 'list',
        name: 'employee',
        message: 'Select an employee to update:',
        choices: employeesArr
    },
    {
        type: 'list',
        name: 'role',
        message: "Please select employee's new role:",
        choices: rolesArr
    }
];

const updateEmployeeManagerQs = [
    {
        type: 'list',
        name: 'employee',
        message: 'Select an employee to update:',
        choices: employeesArr
    },
    {
        type: 'list',
        name: 'manager',
        message: "Please select employee's new manager:",
        choices: managersArr
    }
];

const deleteDepartmentQs = [
    {
        type: 'list',
        name: 'department',
        message: 'Select a department to delete:',
        choices: departmentsArr
    }
];


const deleteRoleQs = [
    {
        type: 'list',
        name: 'role',
        message: 'Select a role to delete:',
        choices: rolesArr
    }
];


const deleteEmployeeQs = [
    {
        type: 'list',
        name: 'name',
        message: 'Select an employee to delete:',
        choices: employeesArr
    }
];

//////////////////////////////////// QUIT ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function quit () {
    console.table(logo({
        name: "Bye!",
    }).render());
    process.exit();
}

//////////////////////// DELETE EMPLOYEES /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function deleteEmployee(name) {
    const employeeName = name.split(" ");
    mysqlConnection.query('DELETE FROM employee WHERE first_name = ? AND last_name = ?;', [employeeName[0], employeeName[1]], function (err, results) {
        console.log(err);
        console.log(results);
        console.table(results);
        start.start();
    })
}

// TODO: fix employeesArr push func 

function getEmployeesToDelete (){
    mysqlConnection.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', function (err, results) {
        employeesArr.length = 0;
        for (const person in results) {
            if (employeesArr.indexOf(results[person].employee_name) === -1) {
                employeesArr.push(results[person].employee_name);
            }
        }
        inquirer.prompt(deleteEmployeeQs)
        .then((response) => {
            deleteEmployee(response.name);
        });        
    })
}

//////////////////////// DELETE ROLES  /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function deleteRoles(role) {
    mysqlConnection.query('DELETE FROM roles WHERE role_title = ?;', role, function (err, results) {
        console.log(err);
        console.log(results);
        console.table(results);
        start.start();
    })
}

function getRolesToDelete (){
    mysqlConnection.query('SELECT role_title FROM roles', function (err, results) {
        for (const role in results) {
            rolesArr.push(results[role].role_title);
        }
        inquirer.prompt(deleteRoleQs)
        .then((response) => {
            deleteRoles(response.role);
        });        
    })
}

//////////////////////// DELETE DEPARTMENT /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function deleteDepartment(department) {
    mysqlConnection.query('DELETE FROM department WHERE department_name = ?;', department, function (err, results) {
        console.log(err);
        console.log(results);
        console.table(results);
        start.start();
    })
}

// TODO: fix deparmentsArr push func 

function getDepartmentsToDelete (){
    mysqlConnection.query('SELECT department_name FROM department', function (err, results) {
        departmentsArr.length = 0;
        for (const department in results) {
            if (departmentsArr.indexOf(results[department].department_name) === -1) {
                departmentsArr.push(results[department].department_name);
            }
        }
        inquirer.prompt(deleteDepartmentQs)
        .then((response) => {
            deleteDepartment(response.department);
        });        
    })
}

////////////////////////// UPDATE EMPLOYEE MANAGER //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function updateManager(name, manager){
    const employeeName = name.split(" ");
    const managerName = manager.split(" ");
    mysqlConnection.query('UPDATE employee SET manager_id = (SELECT a.id FROM (SELECT b.id FROM employee b WHERE b.first_name = ? AND b.last_name = ?) a) WHERE first_name = ? AND last_name = ?;', [managerName[0], managerName[1], employeeName[0], employeeName[1]], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            console.log("Employee's manager has been successfully updated to database.");
            start.start(); 
        }
})};

function updateManagerPrompt() {
    inquirer.prompt(updateEmployeeManagerQs)
    .then((response) => {
        updateManager(response.employee, response.manager);
    });
}

// TODO: fix employeesArr push func 

function selectManager(){
    mysqlConnection.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', function (err, results) {
        //employeesArr = [];
        employeesArr.length = 0;
        for (const person in results) {
            if (employeesArr.indexOf(results[person].employee_name) === -1) {
                employeesArr.push(results[person].employee_name);
            }
        }
        console.log(err);
        console.log(results);
        console.table(results);
    })
    mysqlConnection.query('SELECT concat(b.first_name, " ", b.last_name) AS manager_name FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN roles c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id WHERE b.first_name IS NOT NULL AND b.last_name IS NOT NULL;', function (err, results) {
        managersArr.length = 0;
        for (const person in results) {
            if (managersArr.indexOf(results[person].manager_name) === -1) {
                managersArr.push(results[person].manager_name);
            }
        }
        managersArr.push("None");
        updateManagerPrompt();  
    });
};

////////////////////////// UPDATE EMPLOYEE ROLE /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function updateEmployee(name, role){
    const employeeName = name.split(" ");
    mysqlConnection.query('UPDATE employee SET role_id = (SELECT r.id FROM roles r WHERE r.role_title = ?) WHERE employee.first_name = ? AND employee.last_name = ?;', [role, employeeName[0], employeeName[1]], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            console.log("Employee has been successfully updated to database.");
            start.start(); 
        }
})};

function updateEmployeeRolePrompt() {
    inquirer.prompt(updateEmployeeQ)
    .then((response) => {
        updateEmployee(response.employee, response.role);
    });
}

// TODO: fix employees push func 

function selectEmployeeToUpdate(){
    mysqlConnection.query('SELECT concat(first_name, " ", last_name) AS employee_name FROM employee;', function (err, results) {
        employeesArr.length = 0;
        for (const person in results) {
            if (employeesArr.indexOf(results[person].employee_name) === -1) {
                employeesArr.push(results[person].employee_name);
            }
        }
        console.log(err);
        console.log(results);
        console.table(results);
    })
    mysqlConnection.query('SELECT role_title FROM roles', function (err, results) {
        rolesArr = 0;
        for (const role in results) {
            if (rolesArr.indexOf(results[role].role_title) === -1) {
                rolesArr.push(results[role].role_title);
            }  
        }
        updateEmployeeRolePrompt();   
    });
};


////////////////////////////// ADD AN EMPLOYEE //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function addEmployee(fName, lName, role, manager) {

    const managerName = manager.split(" ");

    mysqlConnection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT r.id FROM roles r WHERE r.role_title = ?), (SELECT e.id FROM employee e WHERE e.first_name = ? AND e.last_name = ?));', [fName, lName, role, managerName[0], managerName[1]], function (err, results) {
        console.log(err);
        console.log(results);
        console.log("This employee has been successfully added to the database!");
        start.start();  
    })
}

// TODO: fix managersArr push func 

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
    mysqlConnection.query("INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE department_name = ?));", [role, Number(salary), department], function (err, results) {
        console.log(results);
        console.log(err);
        console.log("This new role has been successfully added to the database!");
        start.start();  
    })
}

// TODO: fix departmentsArr push func 

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

// TODO: fix departmentsArr push func 

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

// TODO: fix managersArr push func 

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
            selectEmployeeToUpdate();
        break;
        case 'Update Employee Manager':
            selectManager();
        break;
        case 'Delete Department':
            getDepartmentsToDelete();
        break;
        case 'Delete Role':
            getRolesToDelete();
        break;
        case 'Delete Employee':
            getEmployeesToDelete();
        break;
        case 'Quit':
            quit();
        break;
    };
}

module.exports = dbEnquiry;