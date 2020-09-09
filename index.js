var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Playstation3!",
    database: "CMS_db"
});
connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
    .prompt({
        name: "Action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles","Nothing"]
    })
    .then(function(answer) {
        switch(answer.Action){
            case "Add departments, roles, employees":
                console.log("this works");
                tableAdd();
                break;
        case "View departments, roles, employees":
                console.log("this works");
                break;
        case "Update employee roles":
                console.log("this works");
                break;
        default:
            connection.end();
        }
    });
}

function tableAdd(){
    inquirer.prompt({
        name:"addWhat",
        type: "list",
        message:"What would you like to add?",
        choices:["departments","roles","employees"]
    })
    .then(function(answer){
        console.log("fuck");
    });
}