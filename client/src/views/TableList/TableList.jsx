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

import AthleteList from "components/Athlete/AthleteList.jsx";


class RegularTables extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Sporcu Listesi</CardTitle>
              </CardHeader>
              <CardBody>

                <AthleteList />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegularTables;
