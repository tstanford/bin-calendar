class BinCalendarGenerator {

  dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1; //Month from 0 to 11
    const y = date.getFullYear();
    return '' + y + (m<=9 ? '0' + m : m) + (d <= 9 ? '0' + d : d);
  }

  constructor(){}

  async generate(){
    const authToken = await this.login();
    const binCalendar = await this.getCalendar("320130641", authToken);
    const ical = this.convertToCalendar(binCalendar);
    return ical;
  }

  async login(){
    const response = await fetch("https://www.fife.gov.uk/api/citizen?preview=false&locale=en");
    return response.headers.get("authorization");
  }

  async getCalendar(uprn, authToken){
    const response = await fetch("https://www.fife.gov.uk/api/custom?action=powersuite_bin_calendar_collections&actionedby=bin_calendar&loadform=true&access=citizen&locale=en", {
      "headers": {
        "authorization": authToken,
        "content-type": "application/json",
      },
      "body": "{\"name\":\"bin_calendar\",\"data\":{\"uprn\":\""+uprn+"\"},\"email\":\"\",\"caseid\":\"\",\"xref\":\"\",\"xref1\":\"\",\"xref2\":\"\"}",
      "method": "POST",
    });

    const data = await response.json();
    return data.data.tab_collections;
  }

  convertToCalendar(binCalendar){
    let fileContents = "";    
    fileContents+= "BEGIN:VCALENDAR\n";
    fileContents+= "PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\n";
    fileContents+= "VERSION:2.0\n";

    for(var i=0;i<binCalendar.length;i++) {
      var date = new Date(binCalendar[i].date);
      let dateString = this.dateToYMD(date);   
      fileContents+= "BEGIN:VEVENT\n";
      fileContents+= "SUMMARY: "+binCalendar[i].colour+" Bin\n";
      fileContents+= "DTSTART:"+dateString.replace(/-/g, '')+"\n";
      fileContents+= "UID: "+(dateString+"_BinCalender_").padEnd(36,"0")+"\n";
      fileContents+= "END:VEVENT"+"\n"; 
    }

    fileContents+= "END:VCALENDAR\n";

    return fileContents;
  }

}


module.exports = {BinCalendarGenerator}