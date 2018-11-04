

const API_BASE = "http://localhost:8080";

const SERVICE_URL = API_BASE + "/payment";

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


const paymentConnector = {

  getPayments : function(successCallback,errorCallback){
    fetch(SERVICE_URL)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  getPayment : function(link,successCallback,errorCallback){
    fetch(link)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  createPayment : function(payment,successCallback,errorCallback){
    fetch(SERVICE_URL, {
      method: 'POST',
      headers: getApplicationJsonHeader(),
      body: JSON.stringify(payment)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  updatePayment : function(payment,link,successCallback,errorCallback){
    fetch(link, {
      method: 'PUT',
      headers: getApplicationJsonHeader(),
      body: JSON.stringify(payment)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  },

  deletePayment : function(link,successCallback,errorCallback){
    fetch(link, {
      method: 'DELETE'
    })
      .then(handleErrors)
      .then( x => successCallback() )
      .catch(error => errorCallback(error) );
  },

  addRegistration : function(paymentLink,registrationLink,successCallback,errorCallback){
    fetch(paymentLink, {
      method: 'PUT',
      headers: getTextUriListHeader(),
      body : registrationLink
    })
      .then(handleErrors)
      .then(data => successCallback(data) )
      .catch(error => errorCallback(error) );
  }

}

export default paymentConnector;
