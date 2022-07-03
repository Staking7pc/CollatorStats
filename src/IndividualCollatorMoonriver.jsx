import IndividualDashboardMoonriver from "./IndividualDashboardMoonriver";
import Graph from "./Graph";
import Delegators from "./Delegators";
import React, { Component } from "react";

export default class IndividualCollatorMoonriver extends Component {
  render() {
    return (
      <div>
        <IndividualDashboardMoonriver />
        <Graph />
        <Delegators />
      </div>
    );
  }
}
