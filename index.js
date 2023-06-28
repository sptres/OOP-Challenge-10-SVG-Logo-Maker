// import packages needed for application's usage

const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require("./lib/shapes.js");

// Create array of questions for user's choice of SVG logo's properties

const questions = [
    {
        type: "input",
        name: "text",
        message: "Please choose up to 3 characters for your custom SVG logo.",
        validate: function (value) {
            if (value.length > 0 && value.length < 4)
                return true;
            else {
                return `Input for your custom SVG logo cannot be blank or longer than 3 characters.`
            }
        }
    },
    {
        type: "input",
        name: "textColor",
        message: "Please choose a text color of your custom SVG logo by entering color's keyword or a hexadecimal number.",
    },
    {
        type: "list",
        name: "shape",
        message: "Please choose the shape(Circle, Triangle, or Square) for your custom SVG Logo.",
        choices: ["Circle", "Triangle", "Square"]
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Please choose a shape color of your custom SVG logo by entering color's keyword or a hexadecimal number.",
    },
];

// create function to create svg file

function createSVG(fileName, data) {
    fs.writeFile(fileName, data, (err) => 
    err ? console.log(err) : console.log("logo.svg has been generated."))
}

// function that initializes the application

function init() {
    inquirer.prompt(questions)
        .then(({shape,text,textColor,shapeColor}) => {
            if (shape === 'Circle') {
                svgShape = new Circle(shapeColor, text, textColor);
            } else if (shape === 'Triangle') {
                svgShape = new Triangle(shapeColor, text, textColor);
            } else {
                svgShape = new Square(shapeColor, text, textColor);
            }

        createSVG("logo.svg", svgShape.renderSVG())
    })
};

// call for initializing of the application

init();