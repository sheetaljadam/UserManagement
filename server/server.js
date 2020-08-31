var express = require('express');
var bodyParser = require('body-parser');
var isset = require('isset');
var encode = require('nodejs-base64-encode');
var con = require('./db');
var md5 = require('md5');
var app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('CORS_SUPPORTS_CREDENTIALS', true);
    next();
});


app.post('/api/login', function (req, res) {
    var email = isset(req.body.email) ? req.body.email : "";
    var password = isset(req.body.password) ? req.body.password : "";
    var rememberMe = isset(req.body.rememberMe) ? req.body.rememberMe : "";
    if (!email)
        res.json({ status: false, message: 'Email required.' });
    else if (!password)
        res.json({ status: false, message: 'Password required.' })
    else {
        var sql = "SELECT usr_id as uId,usr_name as name FROM usr_reg WHERE usr_email = '" + email + "' AND usr_pass = '" + md5(password) + "'";
        con.query(sql, function (err, result) {
            if (result && result.length) {
                var usrId = result[0].uId;
                var md5Hash = md5('webVillee:' + usrId + ":test1");
                var hash = 'webVillee:' + usrId + ':' + md5Hash;
                var token = encode.encode(hash, 'base64');
                var sql2 = "UPDATE usr_reg SET usr_token ='" + token + "', usr_rem= '" + rememberMe + "'WHERE usr_id = '" + result[0].uId + "'";
                con.query(sql2, function (err, resultset) {
                    console.log(err)
                    if (resultset) {
                        result[0].token = token
                        res.json({ status: true, data: result, message: "User login successfully" });

                    } else
                        res.json({ status: false, message: 'Token not created' })
                });
            } else {
                res.json({ status: false, message: 'Email or password is incorrect' })
            }
        });
    }

});
app.post('/api/userRegistration', function (req, res) {

    var name = isset(req.body.name) ? req.body.name : "";
    var password = isset(req.body.password) ? req.body.password : "";
    var email = isset(req.body.email) ? req.body.email : "";

    if (!name)
        res.json({ status: false, message: 'Name required.' });
    else if (!password)
        res.json({ status: false, message: 'Password required.' })
    else if (!email)
        res.json({ status: false, message: 'Email required.' })
    else {
        verifyToken(token, usrid, function (tokenResult) {
            if (tokenResult) {
                var sql = "INSERT INTO usr_reg (usr_name, usr_pass, usr_email) VALUES ('" + name + "', '" + md5(password) + "', '" + email + "')";
                con.query(sql, function (err, result) {
                    console.log(result)
                    if (result) {
                        res.json({ status: true, message: 'Company registered successfully .' });

                    } else {
                        res.json({ status: false, message: 'Error in user registration, Please try again.' });

                    }
                });
            }

            else
                res.json({ status: false, message: 'Token mismatch' });
        });
    }

});
app.post('/api/editUser', function (req, res) {

    var name = isset(req.body.name) ? req.body.name : "";
    var password = isset(req.body.password) ? req.body.password : "";
    var email = isset(req.body.email) ? req.body.email : "";
    var usrId = isset(req.body.usrId) ? req.body.usrId : "";
    var token = isset(req.body.token) ? req.body.token : "";
    if (!name)
        res.json({ status: false, message: 'Name required.' });
    else if (!email)
        res.json({ status: false, message: 'Email required.' })
    else if (!usrId)
        res.json({ status: false, message: 'User id required.' })
    else {
        verifyToken(token, usrId, function (tokenResult) {
            if (tokenResult) {
                var sql;
                if (password)
                    sql = "UPDATE usr_reg SET usr_name='" + name + "',usr_email='" + email + "',usr_pass='" + md5(password) + "'where usr_id='" + usrId + "'";
                else
                    sql = "UPDATE usr_reg SET usr_name='" + name + "',usr_email='" + email + "'where usr_id='" + usrId + "'";

                con.query(sql, function (err, result) {
                    if (result)
                        res.json({ status: true, message: 'User update successfully .' });
                    else {
                        console.log(err)
                        res.json({ status: false, message: 'Error in user updation, Please try again.' });
                    }
                });
            }

            else
                res.json({ status: false, statusCode: 101, message: 'Token mismatch' });
        });
    }

});
app.post('/api/getUserDetails', function (req, res) {
    var usrId = isset(req.body.usrId) ? req.body.usrId : "";
    var token = isset(req.body.token) ? req.body.token : "";
    if (!usrId)
        res.json({ status: false, message: 'User id required.' });
    else {
        verifyToken(token, usrId, function (tokenResult) {
            if (tokenResult) {
                var sql = "SELECT usr_id as uId,usr_name as name, usr_email as email FROM usr_reg WHERE usr_id= '" + usrId + "'";
                con.query(sql, function (err, result) {
                    if (result && result.length) {
                        res.json({ status: true, data: result, message: "Data found" });
                    } else {
                        res.json({ status: false, message: 'Data not found' })
                    }
                });
            }

            else
                res.json({ status: false, statusCode: 101, message: 'Token mismatch' });
        });
    }

});
var verifyToken = function (token, usrid, callback) {
    var hash = encode.decode(token, 'base64')
    var hashArray = hash.split(":");
    var md5Hash = md5('webVillee:' + hashArray[1] + ':test1');
    var sql = "SELECT * FROM usr_reg WHERE usr_token = '" + token + "' AND usr_id = '" + usrid + "'";
    con.query(sql, function (err, result) {
        if (result.length == 1 && md5Hash == hashArray[2])
            return callback(true);
        else
            return callback(false);
    });
}
app.listen(3000, function () {
    console.log("App Started on PORT 3000");
});
module.exports = app;