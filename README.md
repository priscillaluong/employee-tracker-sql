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



* The 'Get Started' button then directs users to the notes.html:

![notes.html Screenshot](/Assets/images/notes.png)

* New notes can be added by clicking on the '+' icon on the top right of the page, and saved by clicking on the 'save' icon:

![First Note Saved Screenshot](/Assets/images/first-saved-note.png)

* Multiple notes can be saved and added. Previously saved notes can be retrieved in the left hand column:

![Saved Notes Screenshot](/Assets/images/second-note.png)

![Saved Notes 2 Screenshot](/Assets/images/more-notes.png)

* Saved notes can also be deleted by clicking on the 'trash can' icon next to the note you wish to delete. 

![Notes Delete Screenshot](/Assets/images/delete.png)

# Link to Deployed Application:

[Click here](https://shrouded-anchorage-59962.herokuapp.com/)

### Final note:

*Any feedback to improve code or implement best practice would be appreciated* 😊

## Mock-Up

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

You might also want to make your queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).


## Bonus

Try to add some additional functionality to your application, such as the ability to do the following:

* Update employee managers.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

## Grading Requirements

> **Note**: If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count towards your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code
>
> * A repository that includes a unique name but nothing else
>
> * A repository that includes only a README file but nothing else
>
> * A repository that only includes starter code

This Challenge is graded based on the following criteria:

### Deliverables: 10%

* Your GitHub repository containing your application code.

### Walkthrough Video: 27%

* A walkthrough video that demonstrates the functionality of the employee tracker must be submitted, and a link to the video should be included in your README file.

* The walkthrough video must show all of the technical acceptance criteria being met.

* The walkthrough video must demonstrate how a user would invoke the application from the command line.

* The walkthrough video must demonstrate a functional menu with the options outlined in the acceptance criteria.

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

    * Uses the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4).

    * Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.

    * Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

* Follows the table schema outlined in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains a high-quality README with description and a link to a walkthrough video.

### Application Quality 10%

* The application user experience is intuitive and easy to navigate.

### Bonus

Fulfilling any of the following can add up to 20 points to your grade. Note that the highest grade you can achieve is still 100:

* Application allows users to update employee managers (2 points).

* Application allows users to view employees by manager (2 points).

* Application allows users to view employees by department (2 points).

* Application allows users to delete departments, roles, and employees (2 points for each).

* Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department (8 points).

## Review

You are required to submit BOTH of the following for review:

* A walkthrough video demonstrating the functionality of the application.

* The URL of the GitHub repository, with a unique name and a README describing the project.

- - -
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
