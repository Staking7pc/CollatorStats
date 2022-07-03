import React from 'react'
import IndividualDashboardMoonbeam from "./IndividualDashboardMoonbeam";
import Graph from "./Graph";
import Delegators from "./Delegators";

function IndividualCollatorMoonbeam(){
    return (
      <div>
      <IndividualDashboardMoonbeam />
      <Graph />
      <Delegators />
      <p className="Disclaimer">If you encounter an issue please report to us</p>
      </div>
    )
  }

export default IndividualCollatorMoonbeam;

