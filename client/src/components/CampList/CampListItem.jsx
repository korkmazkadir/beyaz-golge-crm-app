import React from "react";
import {
  Table
} from "reactstrap";

import { Link } from 'react-router-dom';


import Moment from 'react-moment';
import Button from 'react-bootstrap/lib/Button';

class CampList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.place}</td>
          <td>
            <Moment format="DD.MM.YYYY">
                {this.props.startDate}
            </Moment>
          </td>
          <td>
            <Moment format="DD.MM.YYYY">
                {this.props.endDate}
            </Moment>
          </td>
          <td>
            <Link to={{ pathname : "/camp-detail", state: { campLink : this.props.link }} } >kamp sayfası</Link>
          </td>
          <td><a href="#" onClick={() => this.props.setSelectedCampLink(this.props.link)}>düzenle</a></td>
        </tr>
    );
  }

}


export default CampList;
