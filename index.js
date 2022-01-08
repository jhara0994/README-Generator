// I tried to keep the file and comments in the order that I did things for clarity.
// You need to delete the file after each time you run it. You could handle that a few different ways but based on the AC it
// doesn't look like that is a requirement.

// First, find the package on NPM for help getting started
// https://github.com/jhara0994/README-Generator
// Looks like they have some examples here: https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples

// The first thing I did was go ahead and install the package in an empty folder using `npm i inquirer`
// Now we need a gitignore file. This is good practice because you don't want to store npm packages in your own project.

// Looks like we need to ask for a bunch of info about the project. So we will make prompts
// and store each response as we go. When we are done we will take all the responses and generate a file.

const inquirer = require('inquirer');
const fs = require("fs");

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
        type: 'list',
        name: 'contributions',
        message: 'How should contributions be made to this project?',
        choices: [
            'Fork and push updates to separate branch',
            'Push updates to main branch',
        ],
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
            'Boost Software License 1.0',
            'BSD 3-Clause License',
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

function getLicense(License) {
    let licenseIcon;
    switch (License) {
        case "MIT":
        licenseIcon = { name: "MIT", color: "blue"};
        break;
        case "Apache 2.0":
        licenseIcon = { name: "Apache+2.0", color: "green"};
        break;
        case "GNU GPL 3.0":
        licenseIcon = { name: "GNU+GPL+3.0", color: "red"};
        break;
    }
    return `![License](https://img.shields.io/static/v1?label=license&message=${licenseIcon.name}&color=${licenseIcon.color})`;    

};

// Create your empty readme file. https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/
fs.writeFile('README.md', '', function (err) {
    if (err) {
        console.log("README already exists. Delete if you want generate another one");
    }
});

// Proper way to append a file with a stream
const logStream = fs.createWriteStream('README.md', {flags: 'a'});

inquirer.prompt(questions).then((answers) => {
    // Build the readme section by section, markdown cheatsheet https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
    // H1 for titles, smaller ones for sections. Don't forget to add newlines.

    // Title at the top (let me know if this syntax doesn't make sense. It's called string interpolation.
    logStream.write(`# ${answers['title']}\n`);

    // Then Badge (grab it out of the map at the bottom)
    var licenseImage = badgesUrlsMap[answers['license']];
    var badgeCode = `![License](${licenseImage})\n`;
    logStream.write(badgeCode);

    // Table of Contents
    logStream.write(tableOfContents);

    // Description
    logStream.write('## Description\n');

    // Installation
    logStream.write('## Installation\n');

    // Usage
    logStream.write('## Usage\n');

    // Contributing
    logStream.write('## Contributing\n');

    // Tests
    logStream.write('## Tests\n');

    // Questions
    logStream.write('## Questions\n');
    logStream.write(`Github Username: ${answers['githubname']}\n`);
    // TODO: Add profile link
    logStream.write(`Github Email: ${answers['email']}\n`);

});

// Make a object to store the badges images, add more if you want. I'm not even sure these are the right things,
// but they probably are.
const badgesUrlsMap = {
    'Apache 2.0 License': 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
    'Boost Software License 1.0': 'https://img.shields.io/badge/License-Boost_1.0-lightblue.svg',
    'BSD 3-Clause License': 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg'
}

// Build the table of contents.
const tableOfContents = '## Table of Contents\n' +
    '\n' +
    '1.  [Description](#description)\n' +
    '2.  [Installation](#installation)\n' +
    '3.  [Usage](#usage)\n' +
    '4.  [Contributing](#contributing)\n' +
    '5.  [Tests](#tests)\n' +
    '6.  [Questions](#questions)\n';



// TODO: Include packages needed for this application

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
