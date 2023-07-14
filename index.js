const express = require('express');
const mysql      = require('mysql');
const mime = require('mime');
const dbconfig   = require('./config/db_config.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.use(express.json());

app.use('/public', express.static(__dirname+'/public'));


app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/main', (req, res)=>{
    res.sendFile(__dirname + '/main.html');
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.get('/navbar', (req, res) => {
    res.sendFile(__dirname + '/navbar.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname+'/dashboard.html');
})

app.get('/diary', (req, res) => {
    res.sendFile(__dirname+'/diary.html');
})

app.get('/meditation', (req, res)=>{
    res.sendFile(__dirname + '/meditation.html');
})


