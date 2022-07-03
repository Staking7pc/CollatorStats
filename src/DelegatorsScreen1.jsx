import { useState, useEffect } from "react";
import "./DelegatorsScreen.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { getAllByDisplayValue, getAllByPlaceholderText } from "@testing-library/react";

function DelegatorsScreen() {
  const initialValues = { delegator: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [moonbeamData, setmoonbeamData] = useState([]);
  const [glmrRewardsData, setglmrRewardsData] = useState([]);
  const [moonriverData, setmoonriverData] = useState([]);
  const [lastUpdated, setlastUpdated] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var round;
    const endpoint = "https://api.subquery.network/sq/bianyunjian/moonbeam-staking-indexer";
    const headers = {
      "content-type": "application/json",
      Authorization: "d6e4be2185b8667c1778dcb2e78c656e24b54f6c",
    };

    await axios
      .get("https://moonbeam.brightlystake.com/api/moonbeam/getDelegatorRank/" + formValues.delegator.toLowerCase())
      .then((res) => {
        console.log(res.data.data);
        setmoonbeamData(res.data.data);        
        try {
          setlastUpdated(res.data.data[0].time);
        } catch {
          console.log('error')
        }

        var round        
        round = res.data.data[0].currentRound - 4;
        
        const graphqlQuery = {
          query:
            `
              {
                query {
                    nominatorRewardDetailHistories (filter:	{ issueroundindex:{greaterThan:` +
            round +
            `}
                      account: { likeInsensitive:"` +
            formValues.delegator.toLowerCase() +
            `"}}) {
                        nodes {
                          id
                          account
                          balance
                          collator
                          realroundindex
                          issueroundindex
                          
                        }
                    }
                }
                }
              `,
          variables: {},
        };
        
        axios({
          url: endpoint,
          method: "post",
          headers: headers,
          data: graphqlQuery,
        }).then((response) => {
          const res = JSON.stringify(response.data.data.query.nominatorRewardDetailHistories.nodes);
          setglmrRewardsData(JSON.parse(res));
          console.log(JSON.parse(res));
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://moonbeam.brightlystake.com/api/moonriver/getDelegatorRank/" + formValues.delegator.toLowerCase())
      .then((res) => {
        setmoonriverData(res.data.data);
        try {
          setlastUpdated(res.data.data[0].time);
        } catch {}
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="header">Enter Delegator address</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input type="text" name="delegator" className="textbox" placeholder="Delegator address" value={formValues.delegator} onChange={handleChange} />
          </div>
          <button className="button">Submit</button>
        </div>
      </form>
      <div className="moonbeam">
        <h2>MOONBEAM</h2>
        <p>Updated every 5 minutes. Last Updated {lastUpdated} UTC</p>
        <Table responsive center>
          <thead className="column-header">
            <tr>
              <th>Collator</th>
              <th>Collator Address</th>
              <th>Active?</th>
              <th>GLMR</th>
              <th>1 Day Reward</th>
              <th>APY (4 rounds)</th>
              <th>Rank</th>
              <th>Revoke Amount</th>
              <th>Action</th>
              <th>Effective on</th>
            </tr>
          </thead>
          <tbody>
            {moonbeamData.map((item, index) => {
              var url = "https://moonbeam.brightlystake.com/moonbeam/analytics/" + item.collator;

              const _collator_list = [...new Set(glmrRewardsData.map((item) => item.collator))];

              var totalRewards = new Map();
              var totalRound = new Map();

              _collator_list.map((collator) => {
                var _totalRewards = 0.0;
                var _rewardsRound = 0;
                var latestRound, firstRound;
                glmrRewardsData.map((e) => {
                  if (e.collator == collator) {
                    _totalRewards = _totalRewards + parseFloat(e.balance);
                    if (_rewardsRound == 0) {
                      latestRound = parseInt(e.realroundindex);
                    }
                    _rewardsRound += 1;
                    firstRound = parseInt(e.realroundindex);
                  }
                });

                totalRewards.set(String(collator).toLowerCase(), parseFloat(_totalRewards).toFixed(4));
                totalRound.set(String(collator).toLowerCase(), firstRound + "-" + latestRound);
              });

              return (
                <tr className="row">
                  <td>{item.identity}</td>
                  <td color="FFEBEE">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <u>{item.collator}</u>
                    </a>
                  </td>
                  <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.isActive}</td>
                  <td>{parseFloat(item.delegation_amount).toFixed(1)}</td>
                  <td>{parseFloat(totalRewards.get(item.collator)).toFixed(2)}</td>
                  <td>{(parseFloat((totalRewards.get(item.collator) * 365) / parseFloat(item.delegation_amount).toFixed(1)) * 100).toFixed(2)}%</td>
                  <td className={item.rank <= 300 ? "Eligible" : "InEligible"}>{item.rank}</td>
                  <td>{item.amount}</td>
                  <td>{item.action}</td>
                  <td>{item.applicable_round}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="moonriver">
        <h2>MOONRIVER</h2>
        <Table responsive center>
          <thead className="column-header">
            <tr>
              <th>Collator</th>
              <th>Collator Address</th>
              <th>Active?</th>
              <th>MOVR</th>
              <th>Rank</th>
              <th>Revoke Amount</th>
              <th>Action</th>
              <th>Effective on</th>
            </tr>
          </thead>
          <tbody>
            {moonriverData.map((item, index) => {
              var url = "https://moonbeam.brightlystake.com/moonriver/analytics/" + item.collator;
              return (
                <tr className="row">
                  <td>{item.identity}</td>
                  <td>
                    <a color="FFEBEE" href={url} target="_blank" rel="noopener noreferrer">
                      <u>{item.collator}</u>
                    </a>
                  </td>
                  <td className={item.isActive === "InActive" ? "InActive" : "Active"}>{item.isActive}</td>
                  <td>{parseFloat(item.delegation_amount).toFixed(1)}</td>
                  <td className={item.rank <= 300 ? "Eligible" : "InEligible"}>{item.rank}</td>
                  <td>{item.amount}</td>
                  <td>{item.action}</td>
                  <td>{item.applicable_round}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <p className="Disclaimer">If you encounter an issue please report to us </p>
    </div>
  );
}

export default DelegatorsScreen;
