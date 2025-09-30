var BinCalendarGenerator = require('./BinCalendarGenerator').BinCalendarGenerator;
var calendar = new BinCalendarGenerator();

const express = require('express')
const path = require('path')
const app = express()
const port = 8080

app.get("/" , (req,res) => {
  const data = calendar.generate().then(data => {
    res.send(data);
  }).catch((error) => {
    console.log(error);
});;
  
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
