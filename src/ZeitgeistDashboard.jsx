import "./ZeitgeistDashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

function ZeitgeistDashboard() {
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
          "https://collatorstats.brightlystake.com/api/Zeitgeist/getCollatorConsts"
        )
        .then((res) => {
          const collatorConsts = res.data.data[0];
          setcollatorConsts(res.data.data);
          setcollatorsCount(collatorConsts.collatorsCount);
          setunStakeDuration(collatorConsts.unStakeDuration);
          settotalIssuance(collatorConsts.totalIssuance);
          setminimumDelegation(collatorConsts.minimumDelegation);
          setmaxDelegatorsPerCandidate(
            collatorConsts.maxDelegatorsPerCandidate
          );
          setblocksPerRound(collatorConsts.blocksPerRound);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("https://collatorstats.brightlystake.com/api/Zeitgeist/getTotalStake")
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
    <>
      <div className="Dashboard">
        <div className="dashboardWrapper">
          <div className="stats">
            <div className="statsHeader">
              <p>Zeitgeist Stats Page</p>
            </div>
            <div className="statsBody">
              <div className="totalSupply">
                <div className="content">
                  <div className="label">Total Supply</div>
                  <div className="value">
                    {totalIssuance
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </div>
              <div className="inflation">
                <div className="content">
                  <div className="label">Inflation</div>
                  <div className="value">5%</div>
                </div>
              </div>
              <div className="collatorCount">
                <div className="content">
                  <div className="label">Collators</div>
                  <div className="value">{collatorsCount}</div>
                </div>
              </div>
              <div className="totalStaked">
                <div className="content">
                  <div className="label">Total Staked</div>
                  <div className="value">
                    {totalActiveStake
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
              </div>
              <div className="apprxAPY">
                <div className="content">
                  <div className="label">Approx APY</div>
                  <div className="value">{Math.ceil(((totalIssuance*0.025)/totalActiveStake)*100)}%</div>
                </div>
              </div>
              <div className="minBond">
                <div className="content">
                  <div className="label">Mininimum Staking</div>
                  <div className="value">{minimumDelegation} GLMR</div>
                </div>
              </div>
              <div className="roundLength">
                <div className="content">
                  <div className="label">Round Length</div>
                  <div className="value">{blocksPerRound} blocks</div>
                </div>
              </div>
              <div className="blockTime">
                <div className="content">
                  <div className="label">Block time</div>
                  <div className="value">~12 sec</div>
                </div>
              </div>
              <div className="unBondDuration">
                <div className="content">
                  <div className="label">UnStake Duration</div>
                  <div className="value">
                    ~{" "}
                    {(
                      (unStakeDuration * blocksPerRound * 12) / 86400
                    ).toFixed(2)}
                    days
                  </div>
                </div>
              </div>
              <div className="rewardsDistrubution">
                <div className="content">
                  <div className="label">Rewards Distribution</div>
                  <div className="value">
                    ~ {(blocksPerRound * 12) / 3600} hrs
                  </div>
                </div>
              </div>
              <div className="activeRewards">
                <div className="content">
                  <div className="label">Rewards Eligibility</div>
                  <div className="value">
                    Top {maxDelegatorsPerCandidate} Nominators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ZeitgeistDashboard;
