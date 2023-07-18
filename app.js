const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const app= express();

const port = process.env.PORT | 6700

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);

const compilerRoute = require('./routes/compiler');

app.use('/',compilerRoute);

app.listen(port,()=>{
    console.log("listening at port");
})

