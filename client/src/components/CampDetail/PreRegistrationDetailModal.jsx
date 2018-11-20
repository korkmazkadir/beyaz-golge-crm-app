import React from "react";
import PropTypes from "prop-types";

import {
  Table,
  Row,
  Col,
  Input
} from "reactstrap";

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';

import { thead, tbody } from "variables/general";
import Moment from 'react-moment';

import registrationConnector from "api_connector/RegistrationConnector.jsx";


class PreRegistrationDetailModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.close = this.close.bind(this);

    this.loadRegistrationData = this.loadRegistrationData.bind(this);
    this.loadMeetingsData = this.loadMeetingsData.bind(this);

    this.state = {
      registration : null,
      meetingsLink : "",
      meetings : []
    };
  }

  close(){
    this.setState({
        registration : null,
        meetingsLink : "",
        meetings : []
    },()=>{
      this.props.close();
    });
  }

  loadRegistrationData(link){
    registrationConnector.getRegistration(link,(registration)=>{
      this.setState({
        registration : registration,
        meetingsLink : registration._links.meetings.href
      },()=>{
        this.loadMeetingsData(this.state.meetingsLink);
      });
    },
    (error)=>{
      console.error("Get registration error : " + error);
    });
  }

  loadMeetingsData(link){
      registrationConnector.getMeetings(link,(data)=>{
        this.setState({meetings : data._embedded.meeting});
      },(error)=>{
        console.error("Get meetings error : " + error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
      // Typical usage (don't forget to compare props):
      if (this.props.isVisible !== prevProps.isVisible) {
        this.loadRegistrationData(this.props.registrationLink);
      }
	}

  render() {
    return (

      <Modal show={this.props.isVisible} onHide={ this.close } size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ön Kayıt Detayı : {this.props.athleteName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>

          <Form.Group as={Row}>

            <Form.Label column sm="3">
              Kayıt Tarihi
            </Form.Label>
            <Col sm="9">
              <Input type="date" name="startDate" value={this.state.registration ? this.state.registration.preRegistration.date : ""} disabled/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Fiyat Teklifi
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text"  value={this.state.registration ? this.state.registration.preRegistration.priceOffer : ""} disabled/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Not
            </Form.Label>
            <Col sm="9">
              <Input type="textarea" value={this.state.registration ? this.state.registration.preRegistration.note : ""} disabled/>
            </Col>
          </Form.Group>

        </Form>

        < hr />

      <Row style={{ height: 300 }}>

        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Görüşme Tarihi</th>
              <th>Görüşme Notu</th>
              <th>Görüşmeyi Yapan</th>
            </tr>
          </thead>
          <tbody>

            {
              this.state.meetings.map(meeting=> (
                  <tr>
                    <td>
                      <Moment format="DD.MM.YYYY">
                          {meeting.date}
                      </Moment>
                    </td>
                    <td>{meeting.note}</td>
                    <td>{meeting.username}</td>
                  </tr>
              ))
            }

          </tbody>
        </Table>
      </Row>

        </Modal.Body>

        <Modal.Footer>

          <Link to={{ pathname : "/icons", state:
            { athleteLink : this.props.athleteLink, preRegistration: this.props.preRegistration }
          }} >
            <Button variant="danger" onClick={()=>{}} pullLeft>
              Kesin Kayıt
            </Button>
          </Link>

          <Button variant="secondary" onClick={this.close}>
            Kapat
          </Button>
        </Modal.Footer>

      </Modal>

    );
  }
}

PreRegistrationDetailModal.propTypes = {
  preRegistration : PropTypes.object,
  athleteLink : PropTypes.string,
  athleteName : PropTypes.string,
  registrationLink: PropTypes.string,
  isVisible : PropTypes.bool,
  close : PropTypes.func
};

export default PreRegistrationDetailModal;
