
import React from "react";

import {
  Row,
  Col,
  Input
} from "reactstrap";

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';

import campConnector from "api_connector/CampConnector.jsx";

class CreateCampModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createNewCamp = this.createNewCamp.bind(this);

    this.state = {
      name :"",
      place : "",
      startDate : "",
      endDate : "",
      componentListVersion : 0
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

  createNewCamp(){

    campConnector.createCamp({
      name :this.state.name,
      place : this.state.place,
      startDate : this.state.startDate,
      endDate : this.state.endDate
    },(response)=>{
      console.log("Create Camp Reponse : " + response);
      this.setState((prevState)=>{ this.setState({
        name :"",
        place : "",
        startDate : "",
        endDate : ""
      }); });
      this.props.updateCampList();
      this.props.handleClose("create");
    },(error)=>{
      console.error("Create camp error : " + error)
    });

  }


  render() {
    return(

      <Modal show={this.props.show} onHide={ () => this.props.handleClose("create")} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Yeni Kamp</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Kamp Adı
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" name="name" placeholder="Kamp Adı" value={this.state.name} onChange={this.handleInputChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Yer
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" name="place" placeholder="Kampın Düzenleneceği Yer"  value={this.state.place} onChange={this.handleInputChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Başlangıç Tarihi
            </Form.Label>
            <Col sm="9">
              <Input type="date" name="startDate" value={this.state.startDate} onChange={this.handleInputChange}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">
              Bitiş Tarihi
            </Form.Label>
            <Col sm="9">
              <Input type="date" name="endDate" value={this.state.endDate} onChange={this.handleInputChange}/>
            </Col>
          </Form.Group>

        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.handleClose("create")}>
            Kapat
          </Button>
          <Button variant="primary" onClick={this.createNewCamp}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

    );
  }

}

export default CreateCampModal;
