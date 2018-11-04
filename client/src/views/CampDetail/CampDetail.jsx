import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { thead, tbody } from "variables/general";

import campConnector from "api_connector/CampConnector.jsx";
import PreRegistrationList from "components/CampDetail/PreRegistrationList.jsx";

class CampDetail extends React.Component {


  constructor(props, context) {
    super(props, context);

    var campLink = "";
    const { location }  = this.props;
    if(location.state){
        campLink = location.state.campLink;
    }

    this.state = {
      campLink : campLink,
      camp : {}
    };
  }

  componentDidMount(prevProps) {
      campConnector.getCamp(this.state.campLink,
        (camp)=>{
          console.log("Camp : " + JSON.stringify(camp));
          this.setState({ camp: camp });
        },
        (error)=>{
          console.error("Get camp error : " + error)
        }
      );
	}


  render() {
    return (
      <div className="content">

        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ön Kayıt Listesi</CardTitle>
              </CardHeader>
              <CardBody>

                {

                  this.state.camp ? <PreRegistrationList camp={this.state.camp} /> : null
                  
                }


              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Kesin Kayıt Listesi</CardTitle>
              </CardHeader>
              <CardBody>


              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ödeme Durumu</CardTitle>
              </CardHeader>
              <CardBody>


              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>



    );
  }
}

export default CampDetail;
