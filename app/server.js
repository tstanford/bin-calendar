const BinCalendarGenerator = require('./BinCalendarGenerator');
const FifeCouncilApiClient = require('./FifeCouncilApiClient');

const apiClient = new FifeCouncilApiClient();
const calendar = new BinCalendarGenerator(apiClient);

const express = require('express')
const path = require('path')
const app = express()
const port = 8080

const uprnList = {
  tim: 320130641,
  kim: 320000142
};

app.get("/:person", (req, res) => {
  if ((req.params["person"] in uprnList) == false) {
    res.status(404).send();
    return;
  }

  calendar.generate(uprnList[req.params["person"]]).then(data => {
    res.appendHeader("Content-Type","text/calendar");
    res.send(data);
  }).catch((error) => {
    console.log(error);
    res.status(500).send();
  });

});

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
