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

class UpdateCampModal extends React.Component {

    constructor(props) {
      super(props);

      this.handleInputChange = this.handleInputChange.bind(this);
      this.updateCamp = this.updateCamp.bind(this);
      this.deleteCamp = this.deleteCamp.bind(this);

      this.state = {
        name :"",
        place : "",
        startDate : "",
        endDate : "",
      };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      if(this.props.selectedCampLink !== undefined && this.props.selectedCampLink != prevProps.selectedCampLink) {

        campConnector.getCamp(this.props.selectedCampLink,
          (data)=>{
            this.setState({
              name : data.name,
              place : data.place,
              endDate : data.endDate,
              startDate : data.startDate,
              endDate : data.endDate,
            })
          },
          (error)=>{
            console.error("Get camp error : " + error);
          });

      }
    }


    updateCamp(){

      campConnector.updateCamp({
        name :this.state.name,
        place : this.state.place,
        startDate : this.state.startDate,
        endDate : this.state.endDate
      },this.props.selectedCampLink,
      (data)=>{
        this.props.updateCampList();
        this.props.handleClose("update");
      },
      (error)=>{
          console.error("Update camp error : " + error);
      });

    }


    deleteCamp(){

      campConnector.deleteCamp(this.props.selectedCampLink,
        (data)=>{
          this.props.updateCampList();
          this.props.handleClose("update");
        },
        (error)=>{
            console.error("Delete camp error : " + error);
        });

    }


    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

      this.setState((prevState)=>{
        console.log("State : " + JSON.stringify(prevState));
      });
    }


    render() {
      return(

        <Modal show={this.props.show} onHide={() => this.props.handleClose("update")} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Kamp Düzenle</Modal.Title>
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

            <Row>

              <Col>
                <Button variant="danger" onClick={this.deleteCamp}>
                  sil
                </Button>
              </Col>

              <Col>
                <Button variant="secondary" onClick={() => this.props.handleClose("update")}>
                  kapat
                </Button>
              </Col>

              <Col>
                <Button variant="primary" onClick={this.updateCamp}>
                  Değişiklikleri Kaydet
                </Button>
              </Col>

            </Row>

          </Modal.Footer>
        </Modal>

      );
    }
}


export default UpdateCampModal;
