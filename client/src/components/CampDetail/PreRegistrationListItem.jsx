import React from "react";
import PropTypes from "prop-types";

import {
  Table
} from "reactstrap";

import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import Button from 'react-bootstrap/lib/Button';

import athleteConnector from "api_connector/AthleteConnector.jsx";

class PreRegistrationListItem extends React.Component {

  constructor(props, context) {
    super(props, context);

    console.log("XXXXXXX");

    this.state = {
        athlete : null,
        athleteReady : false
    };

  }

  componentDidMount(){
    if(this.props.preRegistration ){
      console.log("Getting athlete");
      athleteConnector.getAthlete(this.props.preRegistration._links.athlete.href,
        (athlete) => {
          console.log("Athlete : " + JSON.stringify(athlete));
          this.setState({
            athlete : athlete,
            athleteReady : true
          });
        },
        (error) => { console.error("Get Athlete error : " + error)});
    }
  }

  componentDidUpdate(prevProps) {
    console.log("aaaa");
    if(this.props.preRegistration && !this.state.athleteReady){
      console.log("Getting athlete");
      athleteConnector.getAthlete(this.props.preRegistration._links.athlete.href,
        (athlete) => {
          console.log("Athlete : " + JSON.stringify(athlete));
          this.setState({
            athlete : athlete,
            athleteReady : true
          });
        },
        (error) => { console.error("Get Athlete error : " + error)});
    }
  }

  render() {
    return (

     this.state.athlete ?

        <tr>
          <td>{this.state.athlete.athleteInfo.name + " " + this.state.athlete.athleteInfo.surname}</td>
          <td>
            <Moment format="DD.MM.YYYY">
                {this.state.athlete.athleteInfo.birthDate}
            </Moment>
          </td>
          <td><a href="#" >ön kayıt detayı</a></td>
          <td><a href="#" >görüşme ekle</a></td>
        </tr> : null

    );
  }

}

PreRegistrationListItem.propTypes = {
  preRegistration: PropTypes.object
};


export default PreRegistrationListItem;
