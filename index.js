const express = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/db_config.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});