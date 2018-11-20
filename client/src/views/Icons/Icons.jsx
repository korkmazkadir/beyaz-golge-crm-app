import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col,  Table, } from "reactstrap";

import { thead, tbody } from "variables/general";


import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import icons from "variables/icons";


import AthleteRegistration from "components/AthleteRegistration/AthleteRegistration.jsx";
import PreRegistrationForm from "components/AthleteRegistration/PreRegistrationForm.jsx";
import FinalRegistrationForm from "components/AthleteRegistration/FinalRegistrationForm.jsx";

class Icons extends React.Component {

  constructor(props, context) {
    super(props, context);

    var athleteLinkParam = "";
    var preRegistrationParam = null;
    const { location }  = this.props;
    if(location.state){
        athleteLinkParam = location.state.athleteLink;
        preRegistrationParam = location.state.preRegistration;
    }

    this.hideForms = this.hideForms.bind(this);
    this.showPreRegistrationForm = this.showPreRegistrationForm.bind(this);
    this.showFinalRegistrationForm = this.showFinalRegistrationForm.bind(this);


    this.state = {
      isPreRegistrationFormVisible : false,
      isFinalRegistrationFormVisible : false,
      athleteLink : athleteLinkParam,
      preRegistration : preRegistrationParam
    };

    if(preRegistrationParam){
      console.log("Pre Registration : " + JSON.stringify(preRegistrationParam));
      this.state.isFinalRegistrationFormVisible = true;
    }

  }


  hideForms(){
    console.log("Hiding forms");
    this.setState({
      isPreRegistrationFormVisible : false,
      isFinalRegistrationFormVisible : false,
      athleteLink : ""
    });
  }

  showPreRegistrationForm(athleteLink){
    console.log("show pre registration form");
      this.setState({
        isPreRegistrationFormVisible : true,
        isFinalRegistrationFormVisible : false,
        athleteLink : athleteLink
      });
  }

  showFinalRegistrationForm(athleteLink){
    console.log("show final registration form");
    this.setState({
      isPreRegistrationFormVisible : false,
      isFinalRegistrationFormVisible : true,
      athleteLink : athleteLink
    });
  }

  render() {
    return (
      <div className="content">

        <Row>
          <Col md={12}>
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle>Sporcu Bilgileri</CardTitle>

              </CardHeader>
              <CardBody className="all-icons">

                <AthleteRegistration
                  hideForms={this.hideForms}
                  showPreRegistrationForm={this.showPreRegistrationForm}
                  showFinalRegistrationForm={this.showFinalRegistrationForm}
                  athleteLink={this.state.athleteLink}/>

              </CardBody>
            </Card>
          </Col>
        </Row>

      { this.state.isPreRegistrationFormVisible ?

        <Row>
          <Col md={12}>
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle>Ön Kayıt Formu</CardTitle>

              </CardHeader>
              <CardBody className="all-icons">

                  <PreRegistrationForm athleteLink={this.state.athleteLink} />

              </CardBody>
            </Card>
          </Col>
        </Row> : null

      }


      { this.state.isFinalRegistrationFormVisible ?

        <Row>
          <Col md={12}>
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle>Kesin Kayıt Formu</CardTitle>

              </CardHeader>
              <CardBody className="all-icons">

                <FinalRegistrationForm preRegistration={this.state.preRegistration} athleteLink={this.state.athleteLink} />

              </CardBody>
            </Card>
          </Col>
        </Row> : null

      }


      </div>
    );
  }
}

export default Icons;
