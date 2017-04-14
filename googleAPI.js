const googleTrends = require('google-trends-api');

const getAllResults = query => {
  googleTrends.interestByRegion({
    keyword: query,
    geo: 'US',
    resolution: 'DMA'
  }).then(results => console.log(results));
};

module.exports = getAllResults;
