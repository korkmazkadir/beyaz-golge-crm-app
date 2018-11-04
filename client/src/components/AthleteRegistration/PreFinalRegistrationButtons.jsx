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
          <Button variant="danger" onClick={this.props.deleteRegistration}  block>
            Kayıt Sil
          </Button>
        </Col>

        <Col>
          <Button variant="primary" onClick={this.props.clearForm}  block>
            Formu Temizle
          </Button>
        </Col>

        <Col>
          <Button variant="warning" onClick={this.props.updateRegistration}  block>
            Kayıt Güncelle
          </Button>
        </Col>

      </Row>

    );
  }

}

RegistrationButtons.propTypes = {
  deleteRegistration: PropTypes.func,
  clearForm: PropTypes.func,
  updateRegistration: PropTypes.func,
};


export default RegistrationButtons;
