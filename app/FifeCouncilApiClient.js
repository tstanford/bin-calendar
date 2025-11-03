class FifeCouncilApiClient {

  async login() {
    const url = 'https://www.fife.gov.uk/api/citizen?preview=false&locale=en';
    const options = {
      method: 'HEAD',
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        referer: 'https://www.fife.gov.uk/services/forms/bin-calendar'
      }
    };

    let response = await fetch(url, options);
    return response.headers.get('authorization');
  }

  async getCalendar(uprn, authToken) {
    const url = 'https://www.fife.gov.uk/api/custom?action=powersuite_bin_calendar_collections&actionedby=bin_calendar&loadform=true&access=citizen&locale=en';
    const options = {
      method: 'POST',
      headers: {
        authorization: authToken,
        origin: 'https://www.fife.gov.uk',
        referer: 'https://www.fife.gov.uk/services/forms/bin-calendar',
        'content-type': 'application/json'
      },
      body: '{"name":"bin_calendar","data":{"uprn":"320130641"},"email":"","caseid":"","xref":"","xref1":"","xref2":""}'
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.tab_collections;
  }

}

module.exports = FifeCouncilApiClient

