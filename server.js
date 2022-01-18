// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// your first API endpoint...
app.get(["/api/:time", "/api"], function (req, res) {
  console.log(req.params.time);
  let out;
  let date;
  if (/^\d+$/.test(req.params.time)) {
    let intTime = parseInt(req.params.time, 10);
    date = new Date(intTime);
  } else if (/^(\d{4})-\d{2}-\d{2}$/.test(req.params.time)) {
    date = getDateFromText(req.params.time);
  } else if(req.params.time) {
    date = new Date(req.params.time);
    if (date.toString() !== "Invalid Date") {
    } else {
      return res.json({error: "Invalid Date"});
    }
  } else {
    date = new Date();
  }
  return res.json({
    "unix": date.getTime(), 
    "utc": date.toGMTString()
  });
});

// date should be formated as YYYY-MM-DD
function getDateFromText(textDate) {
  let date = new Date();
  date.setFullYear(textDate.replace(/^(\d{4}).*/, '$1'));
  date.setMonth(textDate.replace(/\d{4}-(\d{2}).*/, '$1') - 1);
  date.setDate(textDate.replace(/\d{4}-\d{2}-(\d{2})/, '$1'));
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
