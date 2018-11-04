import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Input
} from "reactstrap";
// react plugin used to create charts
//import { Line, Pie } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import Stats from "components/Stats/Stats.jsx";
import { thead, tbody } from "variables/general";

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';


import CampList from "components/CampList/CampList.jsx";
import CreateCampModal from "components/CampList/CreateCampModal.jsx";
import UpdateCampModal from "components/CampList/UpdateCampModal.jsx";

class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateCampList = this.updateCampList.bind(this);
    this.setSelectedCampLink = this.setSelectedCampLink.bind(this);

    this.state = {
      showCreateModal: false,
      showUpdateModal: false,
      selectedCampLink : "",
      campListVersion : 0
    };
  }


  updateCampList(){
    this.setState((prevState)=>{
      this.setState({campListVersion : prevState.campListVersion + 1});
    });
  }

  handleClose(modal) {
    if(modal === "create"){
        this.setState({ showCreateModal: false });
    }else if(modal === "update"){
        this.setState({ showUpdateModal: false });
    }
  }

  handleShow(modal) {
    if(modal === "create"){
        this.setState({ showCreateModal: true });
    }else if(modal === "update"){
        this.setState({ showUpdateModal: true });
    }
  }

  setSelectedCampLink(selfLink){
    this.setState(()=>{
      this.setState({selectedCampLink: selfLink});
      this.handleShow("update");
    });

  }

  render() {
    return (
      <div className="content">


        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle>Kamp Listesi</CardTitle>
              </CardHeader>
              <CardBody>

                <CampList key={ this.state.campListVersion } setSelectedCampLink={this.setSelectedCampLink} />

              </CardBody>
              <CardFooter>

              <Button variant="primary" onClick={() => this.handleShow("create")}  block>
                Yeni Kamp
              </Button>

              <CreateCampModal  show={this.state.showCreateModal}
                                handleClose={this.handleClose}
                                updateCampList={this.updateCampList} />

              <UpdateCampModal  show={this.state.showUpdateModal}
                                handleClose={this.handleClose}
                                updateCampList={this.updateCampList}
                                selectedCampLink={this.state.selectedCampLink}/>

              </CardFooter>
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}

export default Dashboard;
