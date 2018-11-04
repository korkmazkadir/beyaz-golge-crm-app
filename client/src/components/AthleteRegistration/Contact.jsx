
import React from "react";
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


class Contact extends React.Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      relationship: "",
      nameSurname: "",
      occupation: "",
      phone: "",
      mobilePhone: "",
      workPhone: "",
      email: ""
    };

    if(this.props.relationship !== undefined){
        this.state.relationship = this.props.relationship;
    }

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.setState((prevState)=>{
      this.props.onStateUpdate(prevState);
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data){
      const data = this.props.data;
      console.log("Data from parent : " + JSON.stringify(data));
      var newState = {};
      //inits state with athlete information comming from parent
      if(data){
        Object.keys(data).forEach( key => newState[key] = data[key]);

        this.setState(newState, () => {
            this.props.onStateUpdate(this.state);
        });
      }
    }
  }


  render() {

    return (
      <div className="content">

        <Row>

          <Col md={6}>
            <Form>

                { this.props.relationship === undefined ?

                  <Form.Group as={Row} controlId="relationship">
                    <Form.Label column sm="3">
                      Yakınlık Derecesi
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="text" name="relationship" value={this.state.relationship} onChange={this.handleInputChange}  placeholder="Yakınlık Derecesi" />
                    </Col>
                  </Form.Group>

                  : null
                }

                <Form.Group as={Row} controlId="nameSurname">
                  <Form.Label column sm="3">
                    Adı Soyadı
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="nameSurname" value={this.state.nameSurname} onChange={this.handleInputChange} placeholder="Ad" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="occupation">
                  <Form.Label column sm="3">
                    Mesleği
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="occupation" value={this.state.occupation} onChange={this.handleInputChange} placeholder="Mesleği" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="phone">
                  <Form.Label column sm="3">
                    Ev Telefonu
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} placeholder="Ev Telefonu" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="mobilePhone">
                  <Form.Label column sm="3">
                    Cep Telefonu
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="mobilePhone" value={this.state.mobilePhone} onChange={this.handleInputChange} placeholder="Cep Telefonu" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="workPhone">
                  <Form.Label column sm="3">
                    İş Telefonu
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="workPhone" value={this.state.workPhone} onChange={this.handleInputChange} placeholder="İş Telefonu" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="email">
                  <Form.Label column sm="3">
                    Email Adresi
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email Adresi" />
                  </Col>
                </Form.Group>

            </Form>
          </Col>

        </Row>

      </div>
    );
  }
}

Contact.propTypes = {
  relationship: PropTypes.string,
  onStateUpdate : PropTypes.func,
  data : PropTypes.object
};

export default Contact;
