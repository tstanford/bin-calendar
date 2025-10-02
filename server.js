var BinCalendarGenerator = require('./BinCalendarGenerator').BinCalendarGenerator;
var calendar = new BinCalendarGenerator();

const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const uprnList = {
  tim : 320130641,
  kim : 320000142
};

app.get("/:person" , (req,res) => {
  if((req.params["person"] in uprnList) == false){
    res.status(404).send();
    return;
  }

  const data = calendar.generate(uprnList[req.params["person"]]).then(data => {
    res.send(data);
  }).catch((error) => {
    console.log(error);
  });
  
});

app.get("/uprn/:uprn" , (req,res) => {
  calendar.generate(uprnList[req.params["uprn"]]).then(data => {
    res.send(data);
  }).catch((error) => {
    console.log(error);
  });
  
});

app.listen(port, () => {
    console.log(`Fife Council Bin Calendar Server listening on port ${port}`)
  });
