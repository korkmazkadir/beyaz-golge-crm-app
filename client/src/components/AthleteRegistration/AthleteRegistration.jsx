import React from "react";

import PropTypes from "prop-types";

import { Row, Col,  Table, } from "reactstrap";

import { thead, tbody } from "variables/general";

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Button from 'react-bootstrap/lib/Button';

import AthleteInfo from "components/AthleteRegistration/AthleteInfo.jsx";
import Contact from "components/AthleteRegistration/Contact.jsx";
import RegistrationButtons from "components/AthleteRegistration/RegistrationButtons.jsx";

import athleteConnector from "api_connector/AthleteConnector.jsx";

class AthleteRegistration extends React.Component {

  constructor(props, context) {
    super(props, context);


    this.clearForm = this.clearForm.bind(this);

    this.updateAthleteInfo = this.updateAthleteInfo.bind(this);
    this.updateMotherInfo = this.updateMotherInfo.bind(this);
    this.updateFatherInfo = this.updateFatherInfo.bind(this);
    this.updateParentInfo = this.updateParentInfo.bind(this);
    this.updateEmergencyInfo = this.updateEmergencyInfo.bind(this);

    this.getAthlete = this.getAthlete.bind(this);
    this.saveAthlete = this.saveAthlete.bind(this);
    this.deleteAthlete = this.deleteAthlete.bind(this);
    this.updateAthlete = this.updateAthlete.bind(this);

    this.state = {
      athleteInfo : {},
      motherInfo : {},
      fatherInfo : {},
      parentInfo : {},
      emergencyInfo : {},
      link : "",
      athleteLink : "",
      existingAthlete : {}
    };
  }

  componentDidMount(){
    const athleteLink = this.props.athleteLink;
    if(athleteLink){
        athleteConnector.getAthlete(athleteLink,(data)=>{
          this.setState({
            existingAthlete : data,
            link : athleteLink
          });
        },(error)=>{
          console.error("Athlete load problem with link : " + athleteLink + " Error : " + error);
        });
    }
  }


  clearForm(){
    this.setState((prevState)=>{

      console.log("Clear forms....")

      this.props.hideForms();

      return {
          athleteInfo : {},
          motherInfo : {},
          fatherInfo : {},
          parentInfo : {},
          emergencyInfo : {},
          link : "",
          existingAthlete : {},
          version : prevState.version+1
      };

  });
  }

  dummy(){
    console.log("Dummy worked...");
  }

  updateAthleteInfo(athleteInfo){
    this.setState({athleteInfo : athleteInfo});
    console.log("Athlete infor update");
  }

  updateMotherInfo(motherInfo){
    this.setState({motherInfo : motherInfo});
    console.log("Mother infor update");
  }

  updateFatherInfo(fatherInfo){
    this.setState({fatherInfo : fatherInfo});
    console.log("Father infor update");
  }

  updateParentInfo(parentInfo){
    this.setState({parentInfo : parentInfo});
    console.log("Parent infor update");
  }

  updateEmergencyInfo(emergencyInfo){
    this.setState({emergencyInfo : emergencyInfo});
    console.log("Emergency infor update");
  }


  getAthlete(){
    return {
      athleteInfo : this.state.athleteInfo,
      motherInfo : this.state.motherInfo,
      fatherInfo : this.state.fatherInfo,
      parentInfo : this.state.parentInfo,
      emergencyInfo : this.state.emergencyInfo
    };
  }

  saveAthlete(){

      var athlete = this.getAthlete();
      athleteConnector.createAthlete(athlete,
        (data)=>{
          console.log("Athlete create : " + JSON.stringify(data))
          this.setState({
            link : data._links.self.href
          })

        },(error)=>{ console.error("Athlete create error : " + error ) }
      );

  }

  deleteAthlete(){
    athleteConnector.deleteAthlete(this.state.link,
      ()=>{ this.clearForm() },
      (error)=>{  console.error("Athlete delete error : " + error ) });
  }


  updateAthlete(){
    var athlete = this.getAthlete();
    athleteConnector.updateAthlete(athlete ,this.state.link,
      ()=>{ },
      (error)=>{  console.error("Athlete success error : " + error ) });
  }

  render() {

    console.log("Athlete information : " + JSON.stringify(this.state.athleteInfo));

    return (
      <div>

        <div>

          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Sporcu">
              <div className="mt-5">
                <AthleteInfo data={this.state.existingAthlete.athleteInfo} onStateUpdate={this.updateAthleteInfo} key={ this.state.version } />
              </div>
            </Tab>

            <Tab eventKey={2} title="Anne">
              <div className="mt-5">
                <Contact data={this.state.existingAthlete.motherInfo} relationship="Anne" onStateUpdate={this.updateMotherInfo} key={ this.state.version }/>
              </div>
            </Tab>

            <Tab eventKey={3} title="Baba" >
              <div className="mt-5">
                <Contact data={this.state.existingAthlete.fatherInfo} relationship="Baba" onStateUpdate={this.updateFatherInfo} key={ this.state.version } />
              </div>
            </Tab>

            <Tab eventKey={4} title="Veli" >
              <div className="mt-5">
                <Contact data={this.state.existingAthlete.parentInfo} onStateUpdate={this.updateParentInfo} key={ this.state.version } />
              </div>
            </Tab>

            <Tab eventKey={5} title="Acil Durum" >
              <div className="mt-5">
                <Contact data={this.state.existingAthlete.emergencyInfo} onStateUpdate={this.updateEmergencyInfo} key={ this.state.version } />
              </div>
            </Tab>
          </Tabs>

        </div>

        <div className="mt-5">

          { this.state.link === "" ?

              <Button variant="primary" onClick={this.saveAthlete}  block>
                Kaydet
              </Button>
              :
              <RegistrationButtons onDelete={this.deleteAthlete} showFinalRegistrationForm={()=>{this.props.showFinalRegistrationForm(this.state.link)}} showPreRegistrationForm={()=>{this.props.showPreRegistrationForm(this.state.link)}} onUpdate={this.updateAthlete} clearForm={this.clearForm}  />
          }

        </div>

      </div>

    );};

}

AthleteRegistration.propTypes = {
  hideForms: PropTypes.func,
  showPreRegistrationForm: PropTypes.func,
  showFinalRegistrationForm: PropTypes.func,
  athleteLink: PropTypes.string
};

export default AthleteRegistration;
