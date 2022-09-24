// TODO: Create a function that returns a license badge based 
// on which license is passed in
// If there is no license, return an empty string
let licenseBadge;
let licenseLink;
let licenseSection;

function renderLicenseBadge(license) {
  switch (license) {
    case 'Apache':
      licenseBadge = '![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)';
      break;
    case 'BSD':
      licenseBadge = '![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)';
      break;
    case 'GNU':
      licenseBadge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
      break;
    case 'IBM':
      licenseBadge = '![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)';
      break;
    case 'MIT':
      licenseBadge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
      break;
    default:
      licenseBadge = '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch (license) {
    case 'Apache':
      licenseLink = '[Link to license](https://opensource.org/licenses/Apache-2.0)';
      break;
    case 'BSD':
      licenseLink = '[Link to license](https://opensource.org/licenses/BSD-3-Clause)';
      break;
    case 'GNU':
      licenseLink = '[Link to license](https://www.gnu.org/licenses/gpl-3.0)';
      break;
    case 'IBM':
      licenseLink = '[Link to license](https://opensource.org/licenses/IPL-1.0)';
      break;
    case 'MIT':
      licenseLink = '[Link to license](https://opensource.org/licenses/MIT)';
      break;
    default:
      licenseLink = '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  switch (license) {
    case 'Apache':
      licenseSection = `Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
      
http://www.apache.org/licenses/LICENSE-2.0
   
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`;
      break;
    case 'BSD':
      licenseSection = `Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
      
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;
      break;
    case 'GNU':
      licenseSection = `This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
      
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.`;
      break;
    case 'IBM':
      licenseSection = 'Copyright (C) 1996, 1999 International Business Machines Corporation and others. All Rights Reserved.';
      break;
    case 'MIT':
      licenseSection = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
      break;
    default:
      licenseSection = '';
  }
}

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
function dbEnquiry(optionResponse) {
    switch(optionResponse) {
        case 'View All Departments':
            console.log("correct!");
        break;
        case 'View All Roles':
            console.log("also correct");
        break;
        case 'View All Employees':
            console.log("also correct");
        break;
        case 'View Employees By Manager':
            console.log("also correct");
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