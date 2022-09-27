# employee-tracker-sql

## Application Description

A command-line application built to manage a company's employee database, using Node.js, Inquirer, and MySQL. It is a **Content management system (CMS)** which allows users to easily view and interact with information stored in databases.

The application will be invoked by using the following command:

```bash
node index.js
```

I was given the below User Story and Acceptance Criteria:

User Story:

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

Acceptance Criteria:

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Required modules / packages:

* Inquirer package
* Node.js
* mysql2 package
* dotenv module
* console.table package
* asciiart-logo module

# Application Interaction: 

* When application is invoked and user has successfully connected to the database, they are prompted with a list of options:

![Application Start Prompts Screenshot](/assets/images/start.png)

Functionality includes: 

* Update employee role.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees etc.

![Application Start Options Screenshot](/assets/images/more-options.png)

* If selected 'View All Departments', a table is printed to the console with ID of each Department and the Department Name:

![View All Department Screenshot](/assets/images/view-departments.png)

* If selected 'View All Employees', or 'View Employees By Manager', a table is printed to the console with specific data from the roles, department and employees tables:

![View All Employees Screenshot](/assets/images/view-employees.png)

![View By Manager Screenshot](/assets/images/view-by-manager.png)

* If selected 'View All Roles', the below is printed to the console:

![View Roles Screenshot](/assets/images/view-roles.png)

* If selected 'Add Role', the user is prompted with a question to specify name of role, salary of role and the department that the role belongs to:

![Add Role Prompt Screenshot](/assets/images/add-role-prompts.png)

* Once the role has been added, we can see the updated record in the appropriate table, in this case, the *Software Tester* Role has been added and can be viewed in the *Roles* table:

![Role Added Screenshot](/assets/images/role-added.png)

* There is also an option to 'Update an Employee Manager', user is prompted to select an employee to update, and select the new Manager, or 'none', for the employee:

![Update Manager Prompt Screenshot](/assets/images/update-manager.png)

![Update Manager 2nd Prompt Screenshot](/assets/images/update-mgr2.png)

Updated Manager Results: 

![Update Manager Results Screenshot](/assets/images/update-mgr3.png)

* If selected 'Delete Role', the user is prompted to select a role to delete, similarly with 'Delete Department' and 'Delete Employee', we can see this interaction below:

![Delete Role Prompt Screenshot](/assets/images/delete.png)

![Delete Role Prompt Screenshot](/assets/images/delete2.png)

* Deleted 'Sales Associate' role evident in the 'View All Roles' table:

![Delete Role Results Screenshot](/assets/images/delete3.png)

* Once user has finished all queries, there is an option to select 'Quit', which prints out 'Bye' using the asciiart-logo package: 

![Exit Screenshot](/assets/images/quit.png)

# Walk-through Video of Application Interaction:

[Click here](https://www.youtube.com/watch?v=fYxc2Zh1FaU&ab_channel=PriscillaLuong)

### Final note:

*Any feedback to improve code or implement best practice would be appreciated* 😊
