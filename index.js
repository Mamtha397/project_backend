const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12597170",
    password: "p7AErIRN2r",
    database: "sql12597170",
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
});

app.post("/api/signUp", (req, res) => {
    let post = { email: req.body.email, password:  req.body.password};
    let sql = "INSERT INTO User SET ?";
    let query = db.query(sql, post, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:"User Created successfully"
            }
        );
    });
});

app.post("/api/signIn", (req, res) => {
    let sql = `SELECT * from User where email = "${req.body.email}"`;
    let query = db.query(sql, async(err,data) => {
        if (err) {
            console.log(err)
        }
        if(data.length>0){
            if(data[0].password === req.body.password){
                res.status(200).json(
                    {
                        status:"Success",
                        message:"Login success"
                    }
                );
            } else {
                res.status(200).json(
                    {
                        status:"Fail",
                        message:"Password or email is incorrect!"
                    }
                );
            }
        }
        else{
            res.status(200).json(
                {
                    status:"Fail",
                    message:"User Does not Exits!"
                }
            );
        }
    });
});

app.post("/api/create", (req, res) => {
    let post = { name: req.body.name, sector: req.body.sector, isAgree: req.body.isAgree};
    let sql = "INSERT INTO Data SET ?";
    let query = db.query(sql, post, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:"Data Created successfully"
            }
        );
    });
});

app.post("/api/update/:id", (req, res) => {
    let sql = `UPDATE Data SET name = '${req.body.name}', sector= '${req.body.sector}', isAgree= '${req.body.isAgree}' where id = '${req.params.id}'`;
    let query = db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:"Data Updated successfully"
            }
        );
    });
});

app.get("/api/getAllData", (req, res) => {
    let sql = "SELECT * from Data";
    let query = db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:data
            }
        );
    });
});

app.get("/api/getData/:id", (req, res) => {
    let sql = `SELECT * from Data where id = '${req.params.id}'`;
    let query = db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:data
            }
        );
    });
});

app.get("/api/deleteData/:id", (req, res) => {
    let sql = `DELETE from Data where id = '${req.params.id}'`;
    let query = db.query(sql, (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).json(
            {
                status:"Success",
                message:data.affectedRows
            }
        );
    });
});

app.listen("3000", () => {
    console.log("Server started on port 3000");
});