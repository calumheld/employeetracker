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
                tableView();
                break;
        case "Update employee roles":
                console.log("this works");
                updateRole();
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
        switch(answer.addWhat){
            case("departments"):
                tableAddDepartment();
                break;
            case("roles"):
                tableAddRole();
                break;
            case("employees"):
                tableAddEmployee();
                break;
            
            default:
                connection.end();
        }
    });
}

function tableAddDepartment(){
    console.log("hello");
    inquirer
    .prompt([
    {
        name: "name",
        type: "input",
        message: "What department would you like to add?"
    }
    ])
    .then(function(answer) {
    connection.query(
        "INSERT INTO department SET ?",
        {
        name: answer.name
        },
        function(err) {
        if (err) throw err;
        console.log("Your department was added successfully!");
        start();
        }
    );
    });
}
function tableAddRole(){
    console.log("hello");
    inquirer
    .prompt([
    {
        name: "title",
        type: "input",
        message: "What is the job title?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary?"
    },
    {
        name: "departmentID",
        type: "input",
        message: "What is the id of the department?",
    }
    ])
    .then(function(answer) {
    connection.query(
        "INSERT INTO role SET ?",
        {
        title: answer.title,
        salary: parseInt(answer.salary),
        department_id:parseInt(answer.departmentID)
        },
        function(err) {
        if (err) throw err;
        console.log("Your role was added successfully!");
        start();
        }
    );
    });
}
function tableAddEmployee(){
    console.log("hello");
    inquirer
    .prompt([
    {
        name: "first",
        type: "input",
        message: "What is the first name?"
    },
    {
        name: "last",
        type: "input",
        message: "What is the last name?"
    },
    {
        name: "roleID",
        type: "input",
        message: "What is the id of the role?",
    },
    {
        name: "managerID",
        type: "input",
        message: "What is the id of the manager?",
    }
    ])
    .then(function(answer) {
    connection.query(
        "INSERT INTO employee SET ?",
        {
        first_name: answer.first,
        last_name: answer.last,
        role_id:parseInt(answer.roleID),
        manager_id:parseInt(answer.managerID)
        },
        function(err) {
        if (err) throw err;
        console.log("Your employee was added successfully!");
        start();
        }
    );
    });
}

function tableView(){
    inquirer.prompt({
        name:"addWhat",
        type: "list",
        message:"What would you like to view?",
        choices:["departments","roles","employees"]
    })
    .then(function(answer){
        switch(answer.addWhat){
            case("departments"):
                tableViewDepartment();
                break;
            case("roles"):
                tableViewRole();
                break;
            case("employees"):
                tableViewEmployee();
                break;
            default:
                connection.end();
        }
    });
}

function tableViewDepartment(){
    connection.query("select * from department", function(err, res) {
    if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Name: " + res[i].name);
        }
    });
}
function tableViewRole(){
    connection.query("select * from role", function(err, res) {
        if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary+ " || Department ID: " + res[i].department_id);
            }
        });
}

function tableViewEmployee(){
    connection.query("select * from employee", function(err, res) {
        if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].id + " || Name: " + res[i].first_name + res[i].last_name+" || Role ID: " + res[i].role_id+ " || Manager ID: " + res[i].manager_id);
            }
        });
}

function updateRole(){
    inquirer
    .prompt([
    {
        name: "employeeId",
        type: "input",
        message: "What is the employee's ID?"
    },
    {
        name: "roleId",
        type: "input",
        message: "What is the role ID?"
    }
    ])
    .then(function(answer) {
        connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
            {
                role_id: parseInt(answer.roleId)
            },
            {
                id: parseInt(answer.employeeId)
            }
            ],
            function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role updated!\n");
            start();
            }
        );
    });

}