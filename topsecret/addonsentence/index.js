const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
     res.sendFile(__dirname + "/" + "addonsentence.html");
})
app.get('/addon.css', (req, res) => {
     res.sendFile(__dirname + "/" + "addon.css");
})
app.get('/sentence.js', (req, res) => {
     res.sendFile(__dirname + "/" + "sentence.js");
})
app.get('/counterdown.js', (req, res) => {
     res.sendFile(__dirname + "/" + "counterdown.js");
})
app.get('/counter.js', (req, res) => {
     res.sendFile(__dirname + "/" + "counter.js");
})
app.get('/favicon.png', (req, res) => {
     res.sendFile(__dirname + "/" + "favicon.png");
})


app.get('/sentence.txt', (req, res) => {
     res.sendFile(__dirname + "/" + "sentence.txt");
})
app.post('/submitFormWithPost', (req, res) => {
     let json = req.body;
     let text = json.inputField;
     let sentence = " " + text.trim();
     
     fs.appendFile('sentence.txt',sentence , function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
     




     res.redirect('./');
})
app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
})
