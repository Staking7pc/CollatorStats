import "./MoonriverDashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

function MoonriverDashboard() {
  
  const [collatorConsts, setcollatorConsts] = useState([]);
  const [collatorsCount, setcollatorsCount] = useState([]);
  const [unStakeDuration, setunStakeDuration] = useState([]);
  const [totalIssuance, settotalIssuance] = useState([]);
  const [minimumDelegation, setminimumDelegation] = useState([]);
  const [maxDelegatorsPerCandidate, setmaxDelegatorsPerCandidate] = useState(
    []
  );
  const [blocksPerRound, setblocksPerRound] = useState([]);
  const [totalActiveStake, settotalActiveStake] = useState([]);

  const url = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "https://moonbeam.brightlystake.com/api/moonriver/getCollatorConsts"
        )
        .then((res) => {
          const collatorConsts = res.data.data[0];
          setcollatorConsts(res.data.data);
          setcollatorsCount(collatorConsts.collatorsCount);
          setunStakeDuration(collatorConsts.unStakeDuration);
          settotalIssuance(collatorConsts.totalIssuance);
          setminimumDelegation(collatorConsts.minimumDelegation);
          setmaxDelegatorsPerCandidate(collatorConsts.maxDelegatorsPerCandidate);
          setblocksPerRound(collatorConsts.blocksPerRound);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("https://moonbeam.brightlystake.com/api/moonriver/getTotalStake")
        .then((res) => {
          const totalActiveStake = res.data.data[0];
          settotalActiveStake(res.data.data[0].totalStake);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="Dashboard">
      <div className="dashboardWrapper">
        <div className="stats">
          <div className="statsHeader">
            <p>Moonriver Stats Page</p>
          </div>
          <div className="statsBodyMOVR">
            <div className="totalSupply">
              <div className="content">
                <div className="labelMOVR">Total Supply</div>
                <div className="value">{totalIssuance.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              </div>
            </div>
            <div className="inflation">
              <div className="content">
                <div className="labelMOVR">Inflation</div>
                <div className="value">5%</div>
              </div>
            </div>
            <div className="collatorCount">
              <div className="content">
                <div className="labelMOVR">Collators</div>
                <div className="value">{collatorsCount}</div>
              </div>
            </div>
            <div className="totalStaked">
              <div className="content">
                <div className="labelMOVR">Total Staked</div>
                <div className="value">{totalActiveStake
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              </div>
            </div>
            <div className="apprxAPY">
              <div className="content">
                <div className="labelMOVR">Approx APY</div>
                <div className="value">{Math.ceil(((totalIssuance*0.025)/totalActiveStake)*100)}%</div>
              </div>
            </div>
            <div className="minBond">
              <div className="content">
                <div className="labelMOVR">Mininimum Staking</div>
                <div className="value">{minimumDelegation} MOVR</div>
              </div>
            </div>
            <div className="roundLength">
              <div className="content">
                <div className="labelMOVR">Round Length</div>
                <div className="value">{blocksPerRound} blocks</div>
              </div>
            </div>
            <div className="blockTime">
              <div className="content">
                <div className="labelMOVR">Block time</div>
                <div className="value">~ 12 sec</div>
              </div>
            </div>
            <div className="unBondDuration">
              <div className="content">
                <div className="labelMOVR">UnStake Duration</div>
                <div className="value">                    ~{" "}
                    {(
                      (unStakeDuration * blocksPerRound * 12) / 86400
                    ).toFixed(2)}
                    days</div>
              </div>
            </div>
            <div className="rewardsDistrubution">
              <div className="content">
                <div className="labelMOVR">Rewards Distribution</div>
                <div className="value">~ {(blocksPerRound * 12) / 3600} hrs</div>
              </div>
            </div>
            <div className="activeRewards">
              <div className="content">
                <div className="labelMOVR">Rewards Eligibility</div>
                <div className="value">Top {maxDelegatorsPerCandidate} Nominators</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoonriverDashboard;
