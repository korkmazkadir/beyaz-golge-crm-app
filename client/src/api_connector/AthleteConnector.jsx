

const API_BASE = "http://localhost:8080";

const SERVICE_URL = API_BASE + "/athlete";

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function getApplicationJsonHeader(){
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

function getTextUriListHeader(){
  return {
    'Content-Type': 'text/uri-list'
  }
}


const athleteConnector = {

  getAthletes : function(successCallback,errorCallback){
    fetch(SERVICE_URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  getAthlete : function(link,successCallback,errorCallback){
    fetch(link)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  createAthlete : function(camp,successCallback,errorCallback){
    fetch(SERVICE_URL, {
      method: 'POST',
      headers: getApplicationJsonHeader(),
      body: JSON.stringify(camp)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  updateAthlete: function(camp,link,successCallback,errorCallback){
    fetch(link, {
      method: 'PUT',
      headers: getApplicationJsonHeader(),
      body: JSON.stringify(camp)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  deleteAthlete : function(link,successCallback,errorCallback){
    fetch(link, {
      method: 'DELETE'
    })
      .then(handleErrors)
      .then( x => successCallback() )
      .catch(error => errorCallback(error) );
  },

  addRegistration : function(athleteLink,registrationLink,successCallback,errorCallback){
    fetch(athleteLink, {
      method: 'PUT',
      headers: getTextUriListHeader(),
      body : registrationLink
    })
      .then(handleErrors)
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  }

}

export default athleteConnector;
