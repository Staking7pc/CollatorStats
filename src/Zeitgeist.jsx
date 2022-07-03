import React from 'react'
import ZeitgeistDashboard from "./ZeitgeistDashboard";
import ZeitgeistCollatorData from "./ZeitgeistCollatorData";

function Zeitgeist () {
  
    return (
      <div>
        {/* <ZeitgeistDashboard /> */}
        <ZeitgeistCollatorData />
        <p className="Disclaimer">If you encounter an issue please report to us</p>
      </div>
    )
  
}

export default Zeitgeist;

