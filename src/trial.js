import axios from "axios";

var round;
const endpoint = "https://api.subquery.network/sq/bianyunjian/moonbeam-staking-indexer";
const headers = {
  "content-type": "application/json",
  Authorization: "d6e4be2185b8667c1778dcb2e78c656e24b54f6c",
};

var round;
round = 220;

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
