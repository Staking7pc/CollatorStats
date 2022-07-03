import "./IndividualDashboardMoonriver.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import identity from "./identity.json";

function IndividualDashboardMoonriver() {

  const [blockCount24Hrs, set24hrBlockCount] = useState([]);
  const [blockCount7Day, set7dayBlockCount] = useState([]);
  const [blockCount30Day, set30dayBlockCount] = useState([]);
  const [totalStake, settotalStake] = useState([]);
  const [delegatorsCount, setdelegatorsCount] = useState([]);
  const [latestBlock, setLatestBlock] = useState([]);
  const [collatorID, setCollatorID] = useState([]);
  const url = useParams();

  useEffect(() => {
    const getBlockCount = () => {
      console.log(url);
      axios
        .get(
          "https://moonbeam.brightlystake.com/api/" +
            url.type +
            "/getBlockCount/" +
            url.collatorId.toLowerCase()
        )
        .then((res) => {
          console.log(res.data._latestBlock);
          set24hrBlockCount(res.data._24hrs);
          set7dayBlockCount(res.data._7day);
          set30dayBlockCount(res.data._30day);
          setLatestBlock(res.data._latestBlock);
          setdelegatorsCount(res.data._delegatorsCount);
          settotalStake(res.data._totalStake);
          setCollatorID(url.collatorId.toLowerCase());
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getAPYDetails = () => {};
    getBlockCount();
    getAPYDetails();
  }, []);

  return (
    <div className="Dashboard1">
      <div className="dashboardWrapper">
        <div className="stats">
          <div className="statsHeader">
            <p>{collatorID}</p>
            <p>{identity[collatorID]}</p>            
          </div>
          <div className="cards-title">
          Stats Summary as of block {latestBlock}
        </div>
          <div className="statsBody">
            <div className="totalSupply">
              <div className="content">
                <div className="labelMOVR">Total Stake</div>
                <div className="value">{totalStake}</div>
              </div>
            </div>
            <div className="inflation">
              <div className="content">
                <div className="labelMOVR">0 blocks Produced Rounds</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="collatorCount">
              <div className="content">
                <div className="labelMOVR">Minimum Stake</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="totalStaked">
              <div className="content">
                <div className="labelMOVR">24 Hour Blocks Count</div>
                <div className="value">{blockCount24Hrs}</div>
              </div>
            </div>
            <div className="apprxAPY">
              <div className="content">
                <div className="labelMOVR">7 Days Blocks Count</div>
                <div className="value">{blockCount7Day}</div>
              </div>
            </div>
            <div className="minBond">
              <div className="content">
                <div className="labelMOVR">30 Days Block Count</div>
                <div className="value">{blockCount30Day}</div>
              </div>
            </div>
            <div className="roundLength">
              <div className="content">
                <div className="labelMOVR">24 Hr APY</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="blockTime">
              <div className="content">
                <div className="labelMOVR">7 Days APY</div>
                <div className="value">--</div>
              </div>
            </div>
            <div className="unBondDuration">
              <div className="content">
                <div className="labelMOVR">30 Days APY</div>
                <div className="value">--</div>
              </div>
            </div>        
            <div className="delegatorCount">
              <div className="content">
                <div className="labelMOVR">Delegator Count</div>
                <div className="value">{delegatorsCount}</div>
              </div>
            </div>     
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default IndividualDashboardMoonriver;
