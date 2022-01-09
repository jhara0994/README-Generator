const inquirer = require('inquirer');
const fs = require("fs");

// inquirer prompts
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What's the title of your project?",
    },
    {
        type: 'input',
        name: 'description',
        message: "Please provide a description for your project: ",
    },
    {
        type: 'input',
        name: 'installation',
        message: "Please provide installation instruction for this project: ",
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter how this program is intended to be used: '
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'Who contributed to this project?',
    },
    {
        type: 'input',
        name: 'test-instructions',
        message: 'Enter test instructions for this program: ', 
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license would you like for your project?',
        choices: [
            'MIT',
            'Apache 2.0',
            'GNU GPL 3.0',
            'Boost Software 1.0',
            'BSD 3-Clause',
            'No License Needed',
        ],
    },
    {
        type: 'input',
        name: 'githubname',
        message: "What is your github username?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your email?",
    },
];

fs.writeFile('README.md', '', function (err) {
    if (err) {
        console.log("README already exists. Delete if you want generate another one");
    } 
});

// Append file using a stream
const logStream = fs.createWriteStream('README.md', {flags: 'a'});

inquirer.prompt(questions).then((answers) => {

    logStream.write(`# ${answers['title']}\n`);

    // Then Badge (grab it out of the map at the bottom)
    var licenseImage = badgesUrlsMap[answers['license']];
    var badgeCode = `![License](${licenseImage})\n`;
    logStream.write(badgeCode);

    // Table of Contents
    logStream.write(tableOfContents);

    // Description
    logStream.write(`## Description:\n`) 
    logStream.write(`### ${answers['description']}\n`);

    // Installation
    logStream.write(`## Installation:\n`) 
    logStream.write(`### ${answers['installation']}\n`);

    // Usage
    logStream.write(`## Usage:\n`) 
    logStream.write(`### ${answers['usage']}\n`);

    // License
    logStream.write(`## License:\n`) 
    logStream.write(`### ${answers['license']}\n`);

    // Contributing
    logStream.write(`## Contributing:\n`) 
    logStream.write(`### ${answers['contributions']}\n`);

    // Tests
    logStream.write(`## Test-Instructions:\n`)
    logStream.write(`### ${answers['test-instructions']}\n`);

    // Questions
    logStream.write('## Questions:\n');
    logStream.write(`Github Username: ${answers['githubname']}\n`);
    logStream.write(`Email: ${answers['email']}\n`);
    logStream.write('For questions concerning this README Generator, please reach out on Github or email.')

});

// object to store badges
const badgesUrlsMap = {
    'MIT': 'https://img.shields.io/badge/License-MIT-blue.svg', 
    'Apache 2.0': 'https://img.shields.io/badge/License-Apache_2.0-green.svg',
    'GNU GPL 3.0': 'https://img.shields.io/badge/License-GNU_GPL_3.0-yellow.svg',
    'Boost Software 1.0': 'https://img.shields.io/badge/License-Boost_1.0-lightblue.svg',
    'BSD 3-Clause': 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg'
}

// Build the table of contents.
const tableOfContents = '## Table of Contents\n' +
    '\n' +
    '1.  [Description](#description)\n' +
    '2.  [Installation](#installation)\n' +
    '3.  [Usage](#usage)\n' +
    '4.  [License](#license)\n' +
    '5.  [Contributing](#contributing)\n' +
    '6.  [Tests](#test-instructions)\n' +
    '7.  [Questions](#questions)\n';



// TODO: Include packages needed for this application

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();

// create license links
function createLicenseLink(License){
    let x;
    switch(License) {
        case "MIT": return mitLink();
        break;
        case "Apache 2.0": return apacheLink();
        break;
        case "GNU GPL 3.0": return gnuLink();
        break;
        case "Boost Software 1.0": return boostLink();
        break;
        case "BSD 3-Clause": return bsdLink();
        break;
    }
    return License;
}

// functions to pull license links
function mitLink() {
    return 'https://en.wikipedia.org/wiki/MIT_License'
}

function apacheLink() {
    return 'https://www.apache.org/licenses/LICENSE-2.0'
}

function gnuLink() {
    return 'https://www.gnu.org/licenses/gpl-3.0.en.html'
}

function boostLink() {
    return 'https://www.boost.org/users/license.html'
}

function bsdLink() {
    return 'https://opensource.org/licenses/BSD-3-Clause'
}