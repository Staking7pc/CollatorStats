import React, { Component } from 'react'
import MoonriverDashboard from "./MoonriverDashboard";
import MoonriverCollatorData from "./MoonriverCollatorData";

function Moonriver(){
    return (
      <div>
        <MoonriverDashboard />
        <MoonriverCollatorData />
        <p className="Disclaimer">If you encounter an issue please report to us</p>
      </div>
    )
  }

export default Moonriver
