const http = require('http');
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const filterService = require('./services/filterDataRoute');
const assetRetriveFilter = require('./services/parseDataRoute');
var axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.post('/getAssets', async function(req, res){
    const parseKeyRequest = req.body.parse;
    try{
        axios.get('https://api.fliplet.com/v1/widgets/assets', {})
        .then(function(response) {
            console.log(response.data.assets);
            resultArray = assetRetriveFilter.parseData(response.data.assets, parseKeyRequest);
            res.send(resultArray);
        });
    }catch(error){
        console.log(error)
    }
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});