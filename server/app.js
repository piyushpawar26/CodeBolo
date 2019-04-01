const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { removeStopWords } = require('./nlp');
const { makeRandomText } = require('./randomText');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response, next) => {
    response.send("This is the code you want!");
});

app.get('/speak', (request, response, next) => {
    console.log("req");
    response.send({
        value: "function() {\n\tconsole.log('asd');\n}"
    });
});

app.post('/speak', (request, response, next) => {
    var speech = removeStopWords(request.body.speech.split(" "));
    var len = speech.length;
    var value;
    console.log(speech);
    if(speech[0] === 'log') {
        value = 'console.log("' + speech.slice(1, len).join(" ") + '");\n';
    } else if(speech[0] === 'create') {
        if(speech[1] === 'function') {
            value = "const " + speech[2] + " = () => {\n\n}\n";
        } else if(speech[1] === 'variable') {
            value = "var " + speech[2] + ";\n";
        } else if(speech[1] === 'constant') {
            value = "const " + speech[2] + ";\n";
        } else {
            value = "P3P: " + makeRandomText(8);
        }
    } else if(speech[0] === 'beautify') {
        value = 'BEAUTIFY';
    } else {
        value = "P3P: " + makeRandomText(8);
    }
    response.send({
        value
    });
});

app.listen(4000, (request, response) => {
    console.log("Listening on port #4000");
});
