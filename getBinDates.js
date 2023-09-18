const fs = require('fs');

var authToken = "";
var binCalendar = [];

//login
  fetch("https://www.fife.gov.uk/api/citizen?preview=false&locale=en", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/json",
    },
    "method": "GET",
  })
  .then(r=>{  
    authToken = r.headers.get("authorization")

    //get bin calendar
    fetch("https://www.fife.gov.uk/api/custom?action=powersuite_bin_calendar_collections&actionedby=bin_calendar&loadform=true&access=citizen&locale=en", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "authorization": authToken,
      "content-type": "application/json",
    },
    "body": "{\"name\":\"bin_calendar\",\"data\":{\"uprn\":\"320130641\"},\"email\":\"\",\"caseid\":\"\",\"xref\":\"\",\"xref1\":\"\",\"xref2\":\"\"}",
    "method": "POST",
  }).then(r2=>r2.json())
  .then(data => {
      let binCalendar = data.data.tab_collections;
      let fileContents = "";
    
      fileContents+= "BEGIN:VCALENDAR\n";
      fileContents+= "PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\n";
      fileContents+= "VERSION:2.0\n";

      for(var i=0;i<binCalendar.length;i++) {
        var date = new Date(binCalendar[i].date);
        let dateString = (date.toISOString().split('T')[0]).toString();   
        fileContents+= "BEGIN:VEVENT\n";
        fileContents+= "SUMMARY: "+binCalendar[i].colour+" Bin\n";
        fileContents+= "DTSTART;VALUE=DATE:"+dateString.replace(/-/g, '')+"\n";
        fileContents+= "UID: "+(dateString+"_BinCalender_").padEnd(36,"0")+"\n";
        fileContents+= "END:VEVENT"+"\n"; 
      }
    
      fileContents+= "END:VCALENDAR\n" ;

      fs.writeFileSync('bincalendar.ics', fileContents);
      console.log("Written ical calendar to bincalendar.ics");

    });
  });


