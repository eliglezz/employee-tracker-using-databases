const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker_db",
  },
  console.log("Connected to Database")
);

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose an option:",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((ans) => {
      console.log(ans);
      if (ans.choice === "View all departments") {
        viewDepartments();
      } else if (ans.choice === "View all roles") {
        viewRoles();
      } else if (ans.choice === "View all employees") {
        viewEmployees();
      } else if (ans.choice === "Add a department") {
        addDepartment();
      } else if (ans.choice === "Add a role") {
        addRole();
      } else if (ans.choice === "Add an employee") {
        addEmployee();
      } else if (ans.choice === "Update an employee role") {
        updateEmployeeRole();
      } else if (ans.choice === "Exit") {
        db.end();
        console.log("Exiting");
      }
    });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      init();
    }
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      init();
    }
  });
}

function viewEmployees() {
  db.query(
    `SELECT * FROM employees JOIN role ON employees.role_id = role_id;`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.table(data);
        init();
      }
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        message: "What is the name of the department you want to add?",
        type: "input",
      },
    ])
    .then((ans) => {
      const query = `INSERT INTO department (name) VALUES (?);`;
      db.query(query, ans.department, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Department added");
          init();
        }
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the title of the role you want to add?",
        type: "input",
      },
      {
        name: "salary",
        message: "What is the salary for this role?",
        type: "number",
      },
      {
        name: "department_id",
        message: "What department id does this role belong to?",
        type: "number",
      },
    ])
    .then((ans) => {
      const query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
      db.query(
        query,
        [ans.title, ans.salary, ans.department_id],
        (err, data) => {
          if (err) {   
            console.log(err);
          } else {
            console.log("Role has been added");
            init();
          }
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "hasManager",
        message: "Does this employee have a manager?",
        type: "list",
        choices: ["Yes", "No"],
      },
    ])
    .then((ans) => {
      if (ans.hasManager === "No") {
        add();
      } else {
        addManager();
      }
    });
}

function add() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What is first name of the employee you want to add?",
        type: "input",
      },
      {
        name: "last_name",
        message: "What is last name of the employee you want to add?",
        type: "input",
      },
      {
        name: "role_id",
        message: "What is the employees role id?",
        type: "number",
      },
    ])
    .then((ans) => {
      const query = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?);`;
      db.query(
        query,
        [ans.first_name, ans.last_name, ans.role_id],
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Employee added");
            init();
          }
        }
      );
    });
}

function addManager() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What is first name of the employee you want to add?",
        type: "input",
      },
      {
        name: "last_name",
        message: "What is last name of the employee you want to add?",
        type: "input",
      },
      {
        name: "role_id",
        message: "What is the employees role id?",
        type: "number",
      },
      {
        name: "manager_id",
        message: "What is the Manager's id?",
        type: "number",
      },
    ])
    .then((ans) => {
      const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
      db.query(
        query,
        [ans.first_name, ans.last_name, ans.role_id, ans.manager_id],
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Employee added");
            init();
          }
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "What is the id of the employee you would like to update?",
        type: "number",
      },
      {
        name: "newRole",
        message: "What is the new role id of the employee?",
        type: "number",
      },
    ])
    .then((ans) => {
      const employee = ans.id;
      const roleid = ans.newRole;
      const query = `UPDATE employees SET role_id=${roleid} WHERE emp_id=${employee};`;
      db.query(query, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Employee role updated");
          init();
        }
      });
    });
}

init();
