
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import {
  Input,
  Dropdown
} from "reactstrap";

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';


import registrationConnector from "api_connector/RegistrationConnector.jsx";
import campConnector from "api_connector/CampConnector.jsx";
import athleteConnector from "api_connector/AthleteConnector.jsx";


import PreFinalRegistrationButtons from "components/AthleteRegistration/PreFinalRegistrationButtons.jsx";

class PreRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.savePreRegistration = this.savePreRegistration.bind(this);
    this.getRegistrationObject = this.getRegistrationObject.bind(this);

    this.deleteRegistration = this.deleteRegistration.bind(this);
    this.updateRegistration = this.updateRegistration.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.state = {
      campRegistrationLink : "",
      date: new Date(),
      priceOffer : "",
      note : "",
      camps : [],
      isButtonEnabled : false,
      registrationLink : ""
    };

  }


  componentDidMount() {
    campConnector.getCamps(
      (data) => { this.setState({ camps: data._embedded.camp })},
      (error) => { console.error("Get camps error : " + error)});
	}


  handleInputChange(event) {
    const target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name === "priceOffer" && (Number(value) < 0 || Number(value) === 0)){
        value = "";
    }

    this.setState({
      [name]: value,
    });

    this.setState((prevState)=>{return {
      isButtonEnabled : ( prevState.campRegistrationLink != "" && prevState.priceOffer != "")
    }});

  }

  getRegistrationObject(){
      return {
        camp : this.state.campRegistrationLink ,
        athlete : this.props.athleteLink ,
        registrationType : "PRE_REGISTRATION",
        preRegistration : {
          date: this.state.date,
          priceOffer : this.state.priceOffer,
          note : this.state.note
        }
      };
  }

  savePreRegistration(){
    var registration = this.getRegistrationObject();

    console.log("prereg Camp : " + registration.camp);
    console.log("prereg Athlete : " + registration.athlete);

    registrationConnector.createRegistration(registration,
      (registration)=>{

        const campRegistrationLink = this.state.campRegistrationLink;
        const registrationLink = registration._links.self.href;

        this.setState({registrationLink:registrationLink});

      },(error)=>{
        console.log("Save Registration error : " + error);
      }
    );
  }



  deleteRegistration(){
      registrationConnector.deleteRegistration(this.state.registrationLink,()=>{
        console.log("Delete registration successful");
        this.clearForm();
      },(error)=>{
        console.log("Delete registration error");
      });
  }


  updateRegistration(){
    var registration = this.getRegistrationObject();
    registrationConnector.updateRegistration(registration,this.state.registrationLink,()=>{
      console.log("Update registration successful");
    },(error)=>{
      console.log("Update registration error");
    });
  }

  clearForm(){
    this.setState({
      campRegistrationLink : "",
      date: new Date(),
      priceOffer : "",
      note : "",
      camps : [],
      isButtonEnabled : false,
      registrationLink : ""
    });
  }

  render() {
    return (
      <div className="mt-1">

        <Row>

          <Col md={6}>
            <Form>

              <Form.Group as={Row} controlId="bloodType">
                <Form.Label column sm="3">
                  Kamp
                </Form.Label>
                <Col sm="9">
                  <Form.Control as="select" name="campRegistrationLink" value={this.state.campRegistrationLink} onChange={this.handleInputChange} >
                    <option value={""}> Kamp Seçiniz </option>
                    {
                      this.state.camps.map( camp => (
                        <option value={camp._links.self.href} >{camp.name}</option>
                      ))
                    }
                  </Form.Control>
                </Col>
              </Form.Group>

                <Form.Group as={Row} controlId="priceOffer">
                  <Form.Label column sm="3">
                    Fiyat Teklifi
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control

                      type="number"
                      name="priceOffer"
                      value={this.state.priceOffer}
                      onChange={this.handleInputChange}
                      placeholder="Fiyat Teklifi" />

                  </Col>
                </Form.Group>

            </Form>
          </Col>

          <Col md={6}>
            <Form>

              <Form.Group as={Row} controlId="note">
                <Form.Label column sm="3">
                  Ön Kayıt Notu
                </Form.Label>
                <Col sm="9">
                  <Input type="textarea" name="note" value={this.state.note} onChange={this.handleInputChange} />
                </Col>
              </Form.Group>

            </Form>
          </Col>

        </Row>

        <div className="mt-5">

          { this.state.registrationLink === "" ?

            <Button variant="primary" onClick={this.savePreRegistration}   disabled={!this.state.isButtonEnabled} block>
              Ön Kaydı Tamamla
            </Button> :

            <PreFinalRegistrationButtons deleteRegistration={this.deleteRegistration} clearForm={this.clearForm} updateRegistration={this.updateRegistration} />

          }

        </div>

      </div>
    );
  }
}

PreRegistrationForm.propTypes = {
  athleteLink: PropTypes.string
};

export default PreRegistrationForm;
