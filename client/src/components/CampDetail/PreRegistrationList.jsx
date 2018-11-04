import React from "react";
import PropTypes from "prop-types";

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
import PreRegistrationListItem from "components/CampDetail/PreRegistrationListItem.jsx";

class PreRegistrationList extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      registrations : [],
      registrationsReady : false
    };
  }

  componentDidUpdate(prevProps) {

    if(this.props.camp && !this.state.registrationsReady){
      console.log("getting registrations");
      campConnector.getRegistrations(
        this.props.camp._links.registrations.href,
        (data)=>{
          console.log("Registrations : " + JSON.stringify(data._embedded.registration));
          this.setState({
            registrations: data._embedded.registration,
            registrationsReady : true
          });
        },
        (error)=>{
          console.error("Get registrartions error : " + error)
        }
      );
    }

	}

  render() {
    return (
      <div className="content">

        <Table responsive style={{ height: 300 }}>
          <thead className="text-primary">
            <tr>
              <th>Sporcu Adı</th>
              <th>Doğum Tarihi</th>
              <th>Ön Kayıt Detayı</th>
              <th>Görüşme Ekle</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.registrations.map(registration=> (
                registration.registrationType === "PRE_REGISTRATION" ?
                  <PreRegistrationListItem preRegistration={registration}/>
                  : null
              ))
            }
          </tbody>
        </Table>

      </div>

    );
  }
}


PreRegistrationList.propTypes = {
  camp: PropTypes.object
};

export default PreRegistrationList;
