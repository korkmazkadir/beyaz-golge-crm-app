
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import {
  Input
} from "reactstrap";


import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import Moment from 'react-moment';



const installmentItemStyle = {
  padding : "10px",
  margin: "5px",
  border: "solid 1px",
  borderColor: "#BFB1A4",
  color: "grey"
};

const specialButton = {
  color: "#0482FF",
  cursor: "pointer"
};

class InstallmentEditorItem extends React.Component {
  constructor(props) {
    super(props);

    //this.addInstallment = this.addInstallment.bind(this);
    //this.removeInstallment = this.removeInstallment.bind(this);

    this.state = {
    };

  }



  render() {

    return (

          <Row align="center" style={installmentItemStyle}>

              <Col align="center">
                {this.props.rank}
              </Col>

              <Col align="center">
                <Moment format="DD.MM.YYYY">
                    {this.props.date}
                </Moment>
              </Col>

              <Col align="center">
                {this.props.price} TL
              </Col>

              <Col align="center">
                  <span style={specialButton} onClick={this.props.onEdit} >düzenle</span>
              </Col>

          </Row>

    )
  };

}

  InstallmentEditorItem.propTypes = {
    rank : PropTypes.number,
    date : PropTypes.string,
    price : PropTypes.number,
    onEdit : PropTypes.func
  };


  export default InstallmentEditorItem;
