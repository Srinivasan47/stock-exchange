var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stock_exchange'
});

connection.connect();
const port = 4000;
app.use(cors());
app.use(express.json());
var userLogger = function (userInfo) {
    let query = `INSERT INTO user_logs(user_id,user_client_details)
            VALUES(?,?)`;
    let value = [userInfo.id, userInfo.userAgent];
    connection.query(query, value, function (err, rows, fields) {
        if (err) throw err;

    });
};

app.get('/', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json({ message: rows[0].solution });

    });

});

app.post('/login', cors(), (req, res) => {
    connection.query('SELECT * from login where email="' + req.body.email + '" and password="' + req.body.password + '"', function (err, rows, fields) {
        if (err) {
            //throw err;
            res.status(200).json({ status: 400, message: "Something goes wrong try later" });
        }

        if (rows.length > 0) {
            const user = {
                id: rows[0].id,
                userAgent: req.headers['user-agent']
            };
            userLogger(user);
            res.status(200).json({
                status: 200, message: "Login Successfully", userId: rows[0].id
            });
        }
        else {
            res.status(200).json({ status: 400, message: "Invalid Username and password" });
        }
    });
});
app.post('/signup', (req, res) => {
    let query = `INSERT INTO login(first_name,last_name,company,company_short_code,email,password,status)
            VALUES(?,?,?,?,?,?,?)`;
    let value = [req.body.firstName, req.body.lastName, req.body.companyName, req.body.companyShortCode, req.body.email, req.body.password, 'active'];
    console.log(req.body);
    connection.query(query, value, function (err, rows, fields) {
        if (err) {
            throw err;
            res.status(200).json({ status: 400, message: "Something goes wrong try later" });
        } else {
            res.status(200).json({ status: 200, message: "SignUp Successfully" });
        }

    });

});
app.post('/buy-order', (req, res) => {
    let query = `INSERT INTO stock_details(user_id,company_code,stock_code,stock_exchange_code,quantity,price,extended_value)
            VALUES(?,?,?,?,?,?,?)`;
    let value = [req.body.userId, req.body.companyCode, req.body.stockCode, req.body.stockExchangeCode, req.body.quantity, req.body.price, req.body.extendedValue];
    console.log(req.body);
    connection.query(query, value, function (err, rows, fields) {
        if (err) {
            throw err;
            res.status(200).json({ status: 400, message: "Something goes wrong try later" });
        } else {
            res.status(200).json({ status: 200, message: "Your Order Place Successfully" });
        }

    });

});
app.get('/forgot-password', (req, res) => {
    res.status(200).json({ message: 'forgot password' });
});
app.get('/get-stock-details', (req, res) => {
    connection.query('SELECT * from stock_details where user_id=' + req.query.userId + '', function (err, rows, fields) {
        if (err) {
            throw err;
            res.status(200).json({ status: 400, message: "Something goes wrong try later" });
        }
        else {
            if (rows.length > 0) {
                res.status(200).json({
                    status: 200, message: "Order Details", data: rows
                });
            }
            else {
                res.status(200).json({
                    status: 200, message: "Order Details", data: []
                });
            }

        }
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});