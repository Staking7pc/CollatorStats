import React from 'react'
import IndividualDashboardZeitgeist from "./IndividualDashboardZeitgeist";
import Graph from "./Graph";
import Delegators from "./Delegators";

function IndividualCollatorZeitgeist(){
    return (
      <div>
      <IndividualDashboardZeitgeist />
      <Graph />
      <Delegators />
      <p className="Disclaimer">If you encounter an issue please report to us</p>
      </div>
    )
  }

export default IndividualCollatorZeitgeist;

