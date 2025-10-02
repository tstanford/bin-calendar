class FifeCouncilApiClient {

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

}

module.exports = FifeCouncilApiClient