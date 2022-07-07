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
  const [totalIssuance, settotalIssuance] = useState([]);
  const [inflation, setInflation] = useState([]);
  const [dailyBlocks, setdailyBlocks] = useState([]);
  const [avgStake, setavgStake] = useState([]);
  
  function getDailyCountData(collator) {
    var count = 0,    a;
    dailyCount.map((item1, index1) => {
      item1.collator === collator ? (count = item1.block_count) : (a = 1);
    });
    return count;
  }

  function getDailyAvgData(collator) {
    var avgBlocks=0.001,    a;
    dailyCount.map((item1, index1) => {
      item1.collator === collator ? (avgBlocks=item1.avgCountedStake) : (a = 1);
    });
    return avgBlocks;
  }
  function calculateAPY(blocks, countedStake) {
    
    var dailyReward = (blocks / dailyBlocks) * ((totalIssuance * (inflation / 2)) / 36500).toFixed(2);
    console.log('daily Reward : ' + dailyReward + " - "+countedStake)
    var returns = ((100 / countedStake) * dailyReward * 365).toFixed(2);
    return returns;
  }
  useEffect(async () => {
    const fetchData2 = async () => {
      await axios
        .get("https://collatorstats.brightlystake.com/api/zeitgeist/getCollatorConsts")
        .then((res) => {
          const collatorConsts = res.data.data[0];
          settotalIssuance(collatorConsts.totalIssuance);
          setInflation(collatorConsts.inflation);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    await fetchData2();
  }, []);

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
          setdailyBlocks(res.data.data[2].totalBlocksProduced);          
          console.log()
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
                <th>Apprx Yesterday's APY*</th>
                <th>Counted Staked**</th>
                <th>Self Staked**</th>
                <th>Delegators**</th>
                <th>Active**</th>
              </tr>
            </thead>
            <tbody>
              {collatorData.map((item, index) => {
                var dailyCountCollator = getDailyCountData(item.collator);
                var dailyCountedAvgCollator = getDailyAvgData(item.collator);
                
                return (
                  <tr className="row">
                    <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.identity}</td>
                    <td>
                      {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
                      <u>{item.collator}</u>
                      {/* </a> */}
                    </td>
                    <td>{dailyCountCollator}</td>
                    <td>{calculateAPY(dailyCountCollator, dailyCountedAvgCollator)} %</td>
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
        <div className="data-labels">* You can </div>
        <div>
          <div className="table-title">
            <h2>APY Calculation Approach </h2>
          </div>
          <p>Daily blocks produced by each collator = a </p>
          <p>total blocks produced on a day = b </p>
          <p>a/b will give rewards share % = c </p>
          <p>total rewards per day is: (total Issuance * (inflation / 2)) / 365 = d</p>
          <p>d * c will give collators share for the day which will distributed among their delegators = e</p>
          <p>Now to get the totalCounted share for the day for a collator we have took the average of counted state captured every 5 mins for that collaotor = f</p>
          <p>(100/f) * e * 365 should give us the APY</p>
          <p> Let us know if you find any discrepancies</p>
        </div>
      </div>
    </>
  );
}
