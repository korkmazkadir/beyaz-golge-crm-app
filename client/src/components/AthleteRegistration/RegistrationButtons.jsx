import React from "react";

import PropTypes from "prop-types";

import { Row, Col,  Table, } from "reactstrap";

import Button from 'react-bootstrap/lib/Button';


class RegistrationButtons extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }


  render() {
    return (

      <Row>
        <Col>
          <Button variant="danger" onClick={this.props.onDelete}  block>
            Sporcu Sil
          </Button>
        </Col>

        <Col>
          <Button variant="primary" onClick={this.props.showFinalRegistrationForm}  block>
            Kesin Kayıt
          </Button>
        </Col>

        <Col>
          <Button variant="primary" onClick={this.props.showPreRegistrationForm}  block>
            Ön Kayıt
          </Button>
        </Col>

        <Col>
          <Button variant="primary" onClick={this.props.clearForm}  block>
            Formu Temizle
          </Button>
        </Col>

        <Col>
          <Button variant="warning" onClick={this.props.onUpdate}  block>
            Sporcu Bilgisi Güncelle
          </Button>
        </Col>

      </Row>

    );
  }

}

RegistrationButtons.propTypes = {
  showPreRegistrationForm: PropTypes.func,
  showFinalRegistrationForm: PropTypes.func
};


export default RegistrationButtons;
