import React from "react";

import PropTypes from "prop-types";

import {
  Table
} from "reactstrap";


import Moment from 'react-moment';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';


const specialButton = {
  color: "#0482FF",
  cursor: "pointer"
};


class AthleteListItem extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.dummy = this.dummy.bind(this);

  }

  dummy(){

  }

  render() {
    return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.gender}</td>
          <td>
            <Moment format="DD.MM.YYYY">
                {this.props.birthDate}
            </Moment>
          </td>
          <td>
            <Link to={{ pathname : "/icons", state: { athleteLink : this.props.link }} } >kayıt/düzenle</Link>
          </td>
          <td>
              <a href="#">iletişim</a>
          </td>
        </tr>
    );
  }

}

AthleteListItem.propTypes = {
  name : PropTypes.string,
  gender : PropTypes.string,
  birthDate : PropTypes.string,
  link : PropTypes.string,
  athlete : PropTypes.object
};


export default AthleteListItem;
