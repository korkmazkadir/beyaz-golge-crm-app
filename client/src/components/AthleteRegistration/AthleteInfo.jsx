import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import {
  Input,
  Dropdown
} from "reactstrap";


import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

class AthleteInfo extends React.Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      idNumber: "",
      name: "",
      surname: "",
      gender: "",
      birthDate: "",
      mobilePhone: "",
      email: "",
      bloodType: "",
      city: "",
      school: "",
      club: "",
      agency: "",
      size: "",
      jerseyNumber: ""
    };


  }


  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data){
      const data = this.props.data;
      console.log("Data from parent : " + JSON.stringify(data));
      var newState = {};
      //inits state with athlete information comming from parent
      Object.keys(data).forEach( key => newState[key] = data[key]);
      this.setState((prevState)=>{
        this.props.onStateUpdate(newState);
        return newState;
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
        [name]: value
    }, () => {
        this.props.onStateUpdate(this.state);
    });

  }


  render() {
    return (
      <div className="content">

        <Row>

          <Col md={6}>
            <Form>
                <Form.Group as={Row} controlId="idNumber">
                  <Form.Label column sm="3">
                    TC Kimlik No
                  </Form.Label>
                  <Col sm="9">
                      <Form.Control type="text" name="idNumber"  value={this.state.idNumber} onChange={this.handleInputChange}  placeholder="TC Kimlik No" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="name">
                  <Form.Label column sm="3">
                    Ad
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control  type="text"  name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Ad" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="surname">
                  <Form.Label column sm="3">
                    Soyad
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="surname" placeholder="Soyad" value={this.state.surname} onChange={this.handleInputChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="gender">
                  <Form.Label column sm="3">
                    Cinsiyet
                  </Form.Label>
                  <Col sm="9">
                    <Input type="select" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                      <option>Erkek</option>
                      <option>Kadın</option>
                    </Input>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="birthDate">
                  <Form.Label column sm="3">
                    Doğum Tarihi
                  </Form.Label>
                  <Col sm="9">
                    <Input type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleInputChange}  placeholder="Doğum Tarihi" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="mobilePhone">
                  <Form.Label column sm="3">
                    Cep Telefon
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="mobilePhone" value={this.state.mobilePhone} onChange={this.handleInputChange} placeholder="Telefon" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="email">
                  <Form.Label column sm="3">
                    Email Adresi
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="email"  name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email Adresi" />
                  </Col>
                </Form.Group>

            </Form>
          </Col>

          <Col md={6}>

            <Form>

              <Form.Group as={Row} controlId="bloodType">
                <Form.Label column sm="3">
                  Kan Grubu
                </Form.Label>
                <Col sm="9">
                  <Input type="select" name="bloodType" value={this.state.bloodType} onChange={this.handleInputChange}>
                    <option>A rh+</option>
                    <option>A rh-</option>
                    <option>B rh+</option>
                    <option>B rh-</option>
                    <option>AB rh+</option>
                    <option>AB rh-</option>
                    <option>0 rh+</option>
                    <option>0 rh-</option>
                  </Input>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="city">
                <Form.Label column sm="3">
                  Geldiği Şehir
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="city" value={this.state.city} onChange={this.handleInputChange}  placeholder="Geldiği Şehir" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="school">
                <Form.Label column sm="3">
                  Okulu
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="school" value={this.state.school} onChange={this.handleInputChange} placeholder="Okulu" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="club">
                <Form.Label column sm="3">
                  Kulübü
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="club" value={this.state.club} onChange={this.handleInputChange} placeholder="Kulübü" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="agency">
                <Form.Label column sm="3">
                  Acenta
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="agency" value={this.state.agency} onChange={this.handleInputChange} placeholder="Acenta" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="size">
                <Form.Label column sm="3">
                  Forma Bedeni
                </Form.Label>
                <Col sm="9">
                  <Input type="select" name="size" name="size" value={this.state.size} onChange={this.handleInputChange} >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XLL</option>
                  </Input>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="jerseyNumber">
                <Form.Label column sm="3">
                  Forma Numarası
                </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" name="jerseyNumber" value={this.state.jerseyNumber} onChange={this.handleInputChange} placeholder="Forma Numarası" />
                </Col>
              </Form.Group>

            </Form>

          </Col>

        </Row>

      </div>
    );
  }
}

AthleteInfo.propTypes = {
  tcNumber: PropTypes.string,
  name : PropTypes.string,
  surname : PropTypes.string,
  birthDate: PropTypes.string,
  data : PropTypes.object
};

export default AthleteInfo;
