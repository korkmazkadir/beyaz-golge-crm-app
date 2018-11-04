import React from "react";
import {
  Row,
  Col,
  Table
} from "reactstrap";


import athleteConnector from "api_connector/AthleteConnector.jsx";

import AthleteListItem from "components/Athlete/AthleteListItem.jsx";

class AthleteList extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      athletes: []
    };
  }

  componentDidMount() {
    athleteConnector.getAthletes(
      (data) => { this.setState({ athletes: data._embedded.athlete })},
      (error) => { console.error("Get athletes error : " + error)});
	}

  render() {
    return (
      <div>

        <Table responsive style={{ height: 300 }}>
          <thead className="text-primary">
            <tr>
              <th>Adı ve Soyadı</th>
              <th>Cinsiyeti</th>
              <th>Doğum Tarihi</th>
              <th>Kayıt / Düzenle</th>
              <th>Iletişim Bilgisi</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.athletes.map(athlete=> (
                <AthleteListItem
                  name={athlete.athleteInfo.name + " " + athlete.athleteInfo.surname}
                  gender={athlete.athleteInfo.gender}
                  birthDate={athlete.athleteInfo.birthDate}
                  link={athlete._links.self.href}
                  athlete={athlete} />
              ))
            }
          </tbody>
        </Table>

      </div>
    );
  }

}


export default AthleteList;
