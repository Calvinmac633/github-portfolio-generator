const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require('util');

const getUsername = function () {
    fs.readFile("index.js", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        console.log(answers.username)

    });
}
// getUsername();
import { answers } from './index.js'
console.log(answers)


// const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;


// axios
//   .get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
//   .then(function(res) {
//     console.log(res.data);
//   });