const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "checkbox",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "red",
            "blue",
            "green",
            "pink"
        ]
    }])
}


const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};


function generateHTML(data, repoNames) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
    
    <body>
        <div class="main">
            <div class="wrapper">
    
                <div class="photo-header">
                    <h1>Hi! My name is usernameVar</h1>
                    <h2>"$"{repoNames.length}</h2>
                </div>
    
                <div class="links-nav">
                    <div class="nav-link">
                        <a></a>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="card"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>`
}


async function init() {

    try {
        const answers = await promptUser();
        console.log(answers.username)
        console.log(answers.color.toString())

        const queryUrl = `https://api.github.com/users/${answers.username}/repos?per_page=100`;
        // const queryUrl = `https://api.github.com/users/${answers.username}/repos?per_page=100`;

        function axiosRun() {
            var strr = []
            axios.get(queryUrl)
            .then(function (res) {
                // return res.data
                const repoNames = res.data.map(function (repo) {
                    return repo.name;
                  });
                // console.log(res);
                // console.log(`Saved ${repoNames.length} repos`);

                return repoNames
                
            });
            strr.push(repoNames);

            console.log(strr)
            return strr
        }
        axiosRun();
        // axiosRun().then(data => {
        //     response.json({ message: "request received", data })
        // })
        // console.log(strr)

        const indexFile = generateHTML(answers)


        await writeFileAsync("github-index.html", indexFile);

        console.log("Successfully wrote to index-github.html");
    } catch (err) {
        console.log(err);
    }
}

init();
