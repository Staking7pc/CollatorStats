import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MoonriverCollatorData.css";
import Table from "react-bootstrap/Table";

function Delegators() {
  const [delegatorsData, setdelegatorsData] = useState([]);
  const url = useParams();
  useEffect(() => {
    axios
      .get("https://moonbeam.brightlystake.com/api/"+url.type+"/getDelegators/"+url.collatorId.toLowerCase())
      .then((res) => {
        setdelegatorsData(res.data.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="statsTable">
        <div className="table-responsive">
          <Table responsive center className="table">
            <thead className="column-header">
              <tr>
                <th>Nominator</th>
                <th>Amount</th>
                <th>Effective On</th>
                <th>Current Round</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {delegatorsData.map((item, index) => {
                return (
                  <tr className="row">
                    <td>{item.delegator}</td>
                    <td>{item.amount}</td>
                    <td>{item.applicable_round}</td>
                    <td>{item.currentRound}</td>
                    <td>{item.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Delegators;
