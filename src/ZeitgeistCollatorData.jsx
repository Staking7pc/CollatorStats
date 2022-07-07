import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "./ZeitgeistCollatorData.css";
import Table from "react-bootstrap/Table";

export default function ZeitgeistCollatorData() {
  const [collatorData, setcollatorData] = useState([]);
  const [asOfBlock, setasOfBlock] = useState([]);
  const [dailyCount, setdailyCount] = useState([]);
  const [_blocksProduced, setblocksProduced] = useState(() => new Map());

  function getDailyCountData(collator) {
    var count = 0,a
    dailyCount.map((item1, index1) => {
      item1.collator===collator? count = item1.block_count : a = 1
    });
    return count
  }

  useEffect(async () => {
    const fetchData = async () => {
      await axios
        .get("https://collatorstats.brightlystake.com/api/zeitgeist/getCollatorDetails")
        .then((res) => {
          console.log("axios 1");
          setcollatorData(res.data.data);
          setasOfBlock(res.data.data[2].asOfBlock);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    await fetchData();
  }, []);

  useEffect(async () => {
    const fetchData1 = async () => {
      await axios
        .get("https://collatorstats.brightlystake.com/api/zeitgeist/getDailyStats")
        .then((res) => {
          console.log("axios 2");
          setdailyCount(res.data.data);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    await fetchData1();
  }, [_blocksProduced]);

  return (
    <>
      <div className="statsTable">
        {/* <div className="table-title">
          <h2>Click on each collator address for more details </h2>
        </div> */}
        <div className="table-title">
          <h4>Updated as of block : {asOfBlock}</h4>
          {console.log("header")}
        </div>

        <div className="table-responsive">
          <Table>
            <thead className="column-header">
              <tr>
                <th>Identity</th>
                <th>Address</th>
                <th>Blocks Produced Yesterday*</th>
                <th>Counted Staked**</th>
                <th>Self Staked**</th>
                <th>Delegators**</th>
                <th>Active**</th>
              </tr>
            </thead>
            <tbody>
              {collatorData.map((item, index) => {
                return (
                  <tr className="row">
                    <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.identity}</td>
                    <td>
                      {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
                      <u>{item.collator}</u>
                      {/* </a> */}
                    </td>
                    <td>{getDailyCountData(item.collator)}</td>
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
