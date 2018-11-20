

const API_BASE = "http://localhost:8080";

const SERVICE_URL = API_BASE + "/meeting";

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

function getApplicationHalJsonHeader(){
  return {
    'Accept': 'application/hal+json',
    'Content-Type': 'application/hal+json',
  }
}


const meetingConnector = {

  getMeetings : function(successCallback,errorCallback){
    fetch(SERVICE_URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  getMeeting : function(link,successCallback,errorCallback){
    fetch(link)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  createMeeting : function(meeting,successCallback,errorCallback){
    fetch(SERVICE_URL, {
      method: 'POST',
      headers: getApplicationHalJsonHeader(),
      body: JSON.stringify(meeting)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  updateMeeting : function(meeting,link,successCallback,errorCallback){
    fetch(link, {
      method: 'PUT',
      headers: getApplicationJsonHeader(),
      body: JSON.stringify(meeting)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  deleteMeeting : function(link,successCallback,errorCallback){
    fetch(link, {
      method: 'DELETE'
    })
      .then(handleErrors)
      .then( x => successCallback() )
      .catch(error => errorCallback(error) );
  }

}

export default meetingConnector;
