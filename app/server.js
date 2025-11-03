const BinCalendarGenerator = require('./BinCalendarGenerator');
const FifeCouncilApiClient = require('./FifeCouncilApiClient');

const apiClient = new FifeCouncilApiClient();
const calendar = new BinCalendarGenerator(apiClient);

const express = require('express')
const path = require('path')
const app = express()
const port = 8080

app.get("/uprn/:uprn", (req, res) => {
  calendar.generate(req.params["uprn"]).then(data => {
    res.appendHeader("Content-Type","text/calendar");
    res.send(data);
  }).catch((error) => {
    console.log(error);
    res.status(500).send();
    return;
  });
});

app.listen(port, () => {
  console.log(`Fife Council Bin Calendar Server listening on port ${port}`)
});
