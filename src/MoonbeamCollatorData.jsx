import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "./MoonbeamCollatorData.css";
import Table from "react-bootstrap/Table";

function MoonbeamCollatorData() {
  const [collatorData, setcollatorData] = useState([]);
  const [asOfBlock, setasOfBlock] = useState([]);
  useEffect(() => {
    axios
      .get("https://collatorstats.brightlystake.com/api/zeitgeist/getCollatorDetails")
      .then((res) => {
        setcollatorData(res.data.data);
        setasOfBlock(res.data.data[2].asOfBlock);
        console.log(res.data.data[2].asOfBlock);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="statsTable">
        <div className="table-title">
          <h2>Click on each collator address for more details </h2>
        </div>
        <div className="table-title">
          <h4>Updated as of block : {asOfBlock}</h4>
        </div>
        <div className="table-responsive">
          <Table>
            <thead className="column-header">
              <tr>
                <th>Identity</th>
                <th>Address</th>
                <th>Counted Staked**</th>
                <th>Self Staked**</th>
                <th>Delegators**</th>
                <th>Active**</th>
              </tr>
            </thead>
            <tbody>
              {collatorData.map((item, index) => {
                var url = "https://moonbeam.brightlystake.com/moonbeam/analytics/" + item.collator;
                return (
                  <tr className="row">
                    <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.identity}</td>
                    <td>
                      {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
                        <u>{item.collator}</u>
                      {/* </a> */}
                    </td>                   
                    <td>{item.countedStake}</td>
                    <td>{item.self}</td>
                    <td>{item.delegatorsCount}</td>
                    <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.isActive}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="data-labels">* - updated daily ** - updated every 5 mins</div>
      </div>
    </>
  );
}

export default MoonbeamCollatorData;
