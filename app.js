const express   = require('express');
const app       = express();
const router    = require('./routes/index');

var bodyParser  = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, ()=> {
    console.log('Server Started at 3000');
})