import React from "react";
import PropTypes from "prop-types";

import {
  Table,
  Row,
  Col,
  Input
} from "reactstrap";

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';

import { thead, tbody } from "variables/general";

import meetingConnector from "api_connector/MeetingConnector.jsx";

import moment from 'moment/moment.js';

class MeetingAddModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.saveMeeting = this.saveMeeting.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      date : moment().format("YYYY-MM-DD"),
      note : "",
      meetingLink : ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });

  }

  saveMeeting(){
    var meeting = {
      registration : this.props.registrationLink,
      date : this.state.date,
      note : this.state.note,
      username : "KADİR"
    };

    meetingConnector.createMeeting(meeting,(data)=>{
      console.log("meeting is saved.");
      this.setState({
        note : "",
        meetingLink : ""
      },()=>{
        this.props.close();
      });
    },(error)=>{
      console.error("meeting create error : " + error);
    });

  }

  render() {
    return (

      <Modal show={this.props.isVisible} onHide={ this.props.close } size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Görüşme Ekle : {this.props.athleteName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Kayıt Tarihi
            </Form.Label>
            <Col sm="9">
              <Input type="date" value={this.state.date} disabled/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Not
            </Form.Label>
            <Col sm="9">
              <Input type="textarea" name="note" value={this.state.note} onChange={this.handleInputChange} />
            </Col>
          </Form.Group>

        </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.close}>
            Kapat
          </Button>
          <Button variant="primary" onClick={this.saveMeeting}>
            Kaydet
          </Button>
        </Modal.Footer>

      </Modal>

    );
  }
}

MeetingAddModal.propTypes = {
  athleteName : PropTypes.string,
  registrationLink: PropTypes.string,
  isVisible : PropTypes.bool,
  close : PropTypes.func
};

export default MeetingAddModal;
