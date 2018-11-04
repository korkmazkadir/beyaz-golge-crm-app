import React from "react";


import {
  Row,
  Col,
  Table
} from "reactstrap";


import CampListItem from "components/CampList/CampListItem.jsx";


import campConnector from "api_connector/CampConnector.jsx";

class CampList extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      camps: []
    };
  }

  componentDidMount() {
    campConnector.getCamps(
      (data) => { this.setState({ camps: data._embedded.camp })},
      (error) => { console.error("Get camps error : " + error)});
	}

  render() {
    return (
      <div>

        <Table responsive style={{ height: 300 }}>
          <thead className="text-primary">
            <tr>
              <th>Kamp Adı</th>
              <th>Kamp Yeri</th>
              <th>Başlangıç Tarihi</th>
              <th>Bitiş Tarihi</th>
              <th>Kamp Sayfası</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.camps.map(camp=> (
                <CampListItem
                  name={camp.name}
                  place={camp.place}
                  startDate={camp.startDate}
                  endDate={camp.endDate}
                  link={camp._links.self.href}
                  setSelectedCampLink={this.props.setSelectedCampLink}/>
              ))
            }
          </tbody>
        </Table>

      </div>
    );
  }

}


export default CampList;
