var express = require('express')
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
const fs = require('fs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/static', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/html/index.html'));
})
app.post('/public/html/index.html', (req,res) => {
    let date = new Date();
    if (req.body.how === 'Единым') {
        let text = req.body.text_ar.replace(/\s/g,'') + date.toISOString();
        fs.writeFile(`${req.body.how}.txt`, text,(e) => {
            if (e) throw e;
            console.log('Записал единым');
        });
    }
    else {
        let text = req.body.text_ar.toUpperCase();
        text = text.split('\n\r');
        fs.writeFile(`${req.body.how}.txt`, text + date.toISOString(),(e) => {
            if (e) throw e;
            console.log('Записал построчно');
        });
    }
return res.send('good');
});
app.use(express.static('html'));
app.listen(3010)