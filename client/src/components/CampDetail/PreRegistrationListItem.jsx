import React from "react";
import PropTypes from "prop-types";

import {
  Table
} from "reactstrap";

import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import Button from 'react-bootstrap/lib/Button';

import athleteConnector from "api_connector/AthleteConnector.jsx";

import PreRegistrationDetailModal from "components/CampDetail/PreRegistrationDetailModal.jsx";
import MeetingAddModal from "components/CampDetail/MeetingAddModal.jsx";

class PreRegistrationListItem extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);

    this.showMeetingAdd = this.showMeetingAdd.bind(this);
    this.hideMeetingAdd = this.hideMeetingAdd.bind(this);

    this.getAthleteName = this.getAthleteName.bind(this);

    this.state = {
        athlete : null,
        athleteLink : "",
        athleteReady : false,
        isDetaislVisible : false,
        isMeetingAddVisible : false
    };

  }

  showMeetingAdd(){
    this.setState({isMeetingAddVisible : true});
  }

  hideMeetingAdd(){
    this.setState({isMeetingAddVisible : false});
  }

  showDetails(){
    this.setState({isDetaislVisible : true});
  }

  hideDetails(){
    this.setState({isDetaislVisible : false});
  }

  getAthleteName(){
    return this.state.athlete.athleteInfo.name + " " + this.state.athlete.athleteInfo.surname;
  }

  componentDidMount(){
    if(this.props.preRegistration ){
      console.log("Getting athlete");
      athleteConnector.getAthlete(this.props.preRegistration._links.athlete.href,
        (athlete) => {
          console.log("Athlete : " + JSON.stringify(athlete));
          this.setState({
            athlete : athlete,
            athleteLink : athlete._links.self.href,
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
          <td>{this.getAthleteName()}</td>
          <td>
            <Moment format="DD.MM.YYYY">
                {this.state.athlete.athleteInfo.birthDate}
            </Moment>
          </td>
          <td>
            <a href="#" onClick={this.showDetails}>ön kayıt detayı</a>
          </td>

          <td>
            <a href="#" onClick={this.showMeetingAdd}>görüşme ekle</a>
          </td>

          <PreRegistrationDetailModal
            preRegistration={this.props.preRegistration}
            athleteLink={this.state.athleteLink}
            athleteName={this.getAthleteName()}
            registrationLink={this.props.preRegistration._links.self.href}
            isVisible={this.state.isDetaislVisible}
            close={this.hideDetails}/>

          <MeetingAddModal
            preRegistraton={this.props.preRegistration}
            athleteName={this.getAthleteName()}
            registrationLink={this.props.preRegistration._links.self.href}
            isVisible={this.state.isMeetingAddVisible}
            close={this.hideMeetingAdd}
            />

        </tr> : null

    );
  }

}

PreRegistrationListItem.propTypes = {
  preRegistration: PropTypes.object
};


export default PreRegistrationListItem;
