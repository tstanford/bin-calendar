class BinCalendarGenerator {

  #apiClient;

  constructor(client){
    this.#apiClient = client;
  }

  async generate(uprn){
    const authToken = await this.#apiClient.login();
    const binCalendar = await this.#apiClient.getCalendar(uprn, authToken);
    const ical = this.#convertToCalendar(binCalendar);
    return ical;
  }

  #convertToCalendar(binCalendar){
    let fileContents = "";    
    fileContents+= "BEGIN:VCALENDAR\n";
    fileContents+= "PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN\n";
    fileContents+= "VERSION:2.0\n";

    for(var i=0;i<binCalendar.length;i++) {
      var date = new Date(binCalendar[i].date);
      let dateString = this.#dateToYMD(date);   
      fileContents+= "BEGIN:VEVENT\n";
      fileContents+= "SUMMARY: "+binCalendar[i].colour+" Bin\n";
      fileContents+= "DTSTART:"+dateString.replace(/-/g, '')+"\n";
      fileContents+= "UID: "+(dateString+"_BinCalender_").padEnd(36,"0")+"\n";
      fileContents+= "END:VEVENT"+"\n"; 
    }

    fileContents+= "END:VCALENDAR\n";

    return fileContents;
  }

  #dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1; //Month from 0 to 11
    const y = date.getFullYear();
    return '' + y + (m<=9 ? '0' + m : m) + (d <= 9 ? '0' + d : d);
  } 

}


module.exports = BinCalendarGenerator