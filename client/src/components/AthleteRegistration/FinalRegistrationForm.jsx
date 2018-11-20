
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
import paymentConnector from "api_connector/PaymentConnector.jsx";

import PreFinalRegistrationButtons from "components/AthleteRegistration/PreFinalRegistrationButtons.jsx";

import InstallmentEditor from "components/AthleteRegistration/InstallmentEditor.jsx";


class FinalRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.savePreRegistration = this.savePreRegistration.bind(this);
    this.getRegistrationObject = this.getRegistrationObject.bind(this);

    this.deleteRegistration = this.deleteRegistration.bind(this);
    this.updateRegistration = this.updateRegistration.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.setInstallments = this.setInstallments.bind(this);
    this.isButtonEnabled = this.isButtonEnabled.bind(this);


    this.state = {
      campRegistrationLink : "",
      date: new Date(),
      price : 0,
      advancePayment : "",
      numberOfInstallments : 0,
      joiningDate: "",
      leavingDate : "",
      transportaionType : "PERSONAL",
      transportationNote : "",
      form : false,
      agreement : false,
      healthReport : false,
      installments : [],
      camps : [],
      isButtonEnabled : false,
      registrationLink : ""
    };

    if(this.props.preRegistration){
      console.log("-->Pre registration : " + this.props.preRegistration);
      const preReg = this.props.preRegistration;
      this.state.price = preReg.preRegistration.priceOffer;
      this.state.registrationLink = preReg._links.self.href;

      campConnector.getCamp(preReg._links.camp.href,(camp)=>{
          this.setState({
            campRegistrationLink : camp._links.self.href
          });
      },(error)=>{
        console.error("Get camp error : " + error);
      });

    }

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

    if(name === "price" && (Number(value) < 0 || Number(value) === 0)){
        value = "";
    }

    this.setState({
      [name]: value,
    });

    this.setState((prevState)=>{return {
      isButtonEnabled : this.isButtonEnabled(prevState)
    }});
  }

  isButtonEnabled(prevState){

     var installmentsReady = false;
     if( Number(prevState.price) === Number(prevState.advancePayment) ||
     ( Number(prevState.price) > Number(prevState.advancePayment) && prevState.installments.length > 0)){
       installmentsReady = true;
       console.log("installmentsReady");
     }

      if(prevState.campRegistrationLink != "" &&
                          prevState.price != "" &&
                          prevState.joiningDate != "" &&
                          prevState.leavingDate != "" && installmentsReady){
        return true;
      }
      return false;
  }


  getRegistrationObject(){
      return {
        camp : this.state.campRegistrationLink ,
        athlete : this.props.athleteLink ,
        registrationType : "REGISTRATION",
        finalRegistration : {
          date: this.state.date,
          price : this.state.price,
          advancePayment : this.state.advancePayment,
          numberOfInstallments : this.state.numberOfInstallments,
          joiningDate: this.state.joiningDate,
          leavingDate : this.state.leavingDate,
          transportaionType : this.state.transportaionType,
          transportationNote : this.state.transportationNote,
          form : this.state.form,
          agreement : this.state.agreement,
          healthReport : this.state.healthReport
        }
      };
  }


  savePreRegistration(){
    var registration = this.getRegistrationObject();
    registrationConnector.createRegistration(registration,
      (registration)=>{

        const campRegistrationLink = this.state.campRegistrationLink;
        const registrationLink = registration._links.self.href;

        this.setState({registrationLink:registrationLink});

        this.state.installments.map((payment)=>{
          payment.registration = registrationLink;
          paymentConnector.createPayment(payment,(data)=>{
              console.log("payment recorded : " + data);
          },(error)=>{
             console.error("payment error : " + error);
          });
        });


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
      price : "",
      advancePayment : "",
      numberOfInstallments : 0,
      joiningDate: "",
      leavingDate : "",
      transportaionType : "PERSONAL",
      transportationNote : "",
      form : false,
      agreement : false,
      healthReport : false,
      installments : [],
      camps : [],
      isButtonEnabled : false,
      registrationLink : ""
    });
  }

  setInstallments(installments){
      this.setState({installments : installments});
      this.setState((prevState)=>{return {
        isButtonEnabled : this.isButtonEnabled(prevState)
      }});
  }

  render() {
    return (
      <div className="mt-1">

        <Row>

          <Col md={6}>
            <Form>

              <Form.Group as={Row} controlId="campRegistrationLink">
                <Form.Label column sm="3">
                  Kamp
                </Form.Label>
                <Col sm="9">
                  <Input type="select" name="campRegistrationLink" value={this.state.campRegistrationLink} onChange={this.handleInputChange} >
                    <option value={""}> Kamp Seçiniz </option>
                    {
                      this.state.camps.map( camp => (
                        <option value={camp._links.self.href} >{camp.name}</option>
                      ))
                    }
                  </Input>
                </Col>
              </Form.Group>


                <Form.Group as={Row} controlId="price">
                  <Form.Label column sm="3">
                    Fiyat
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} placeholder="Fiyat" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="advancePayment">
                  <Form.Label column sm="3">
                    Peşinat
                  </Form.Label>
                  <Col sm="9">
                    <Input type="number" name="advancePayment" value={this.state.advancePayment} onChange={this.handleInputChange} placeholder="peşinat"  />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="installments">
                  <Form.Label column sm="3">
                    Taksitler
                  </Form.Label>
                  <Col sm="9">
                    <InstallmentEditor
                        price={this.state.price}
                        advancePayment={this.state.advancePayment}
                        setInstallments={this.setInstallments}
                     />
                  </Col>
                </Form.Group>


            </Form>
          </Col>

          <Col md={6}>
            <Form>

              <Form.Group as={Row} controlId="joiningDate">
                <Form.Label column sm="3">
                  Katılma Tarihi
                </Form.Label>
                <Col sm="9">
                  <Input type="date" name="joiningDate" value={this.state.joiningDate} onChange={this.handleInputChange}  placeholder="Katılma Tarihi" />
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="leavingDate" >
                <Form.Label column sm="3">
                  Ayrılma Tarihi
                </Form.Label>
                <Col sm="9">
                  <Input type="date" name="leavingDate" value={this.state.leavingDate} onChange={this.handleInputChange}   placeholder="Katılma Tarihi" />
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="transportaionType">
                <Form.Label column sm="3">
                  Ulaşım Şekli
                </Form.Label>
                <Col sm="9">
                  <Input type="select" name="transportaionType" value={this.state.transportaionType} onChange={this.handleInputChange} >
                    <option value={"PERSONAL"}>Kişisel</option>
                    <option value={"BUS_TERMINAL"}>Otogar</option>
                    <option value={"AIRPORT"}>Havalimanı</option>
                  </Input>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="transportationNote">
                <Form.Label column sm="3">
                  Ulaşım Notu
                </Form.Label>
                <Col sm="9">
                  <Input type="textarea" name="transportationNote" value={this.state.transportationNote} onChange={this.handleInputChange} placeholder="Ulaşım Notu" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="bloodType">
                <Form.Label column sm="3">
                  Belgeler
                </Form.Label>
                <Col>
                  <Input type="checkbox" name="form" value={this.state.form} onChange={this.handleInputChange}  /> Form
                </Col>
                <Col>
                  <Input type="checkbox" name="agreement" value={this.state.agreement} onChange={this.handleInputChange}  /> Sözleşme
                </Col>
                <Col>
                  <Input type="checkbox" name="healthReport" value={this.state.healthReport} onChange={this.handleInputChange}  /> Sağlık Raporu
                </Col>
              </Form.Group>


            </Form>
          </Col>

        </Row>

        <div className="mt-5">


          { this.state.registrationLink === "" ?

            <Button variant="primary" onClick={this.savePreRegistration}   disabled={!this.state.isButtonEnabled} block>
              Kesin Kaydı Tamamla
            </Button> :

            <PreFinalRegistrationButtons deleteRegistration={this.deleteRegistration} clearForm={this.clearForm} updateRegistration={this.updateRegistration} />

          }

        </div>

      </div>
    );
  }
}


FinalRegistrationForm.propTypes = {
  athleteLink: PropTypes.string,
  preRegistration : PropTypes.object
};


export default FinalRegistrationForm;
