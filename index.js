// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown.js')
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "IBM",
          "MIT"
      ]
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Please enter your full name:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter your email adress:',
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