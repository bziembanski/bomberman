const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    console.log('ktoś se wszedł sukces')
});


app.listen(port, () => {});