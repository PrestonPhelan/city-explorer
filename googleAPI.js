const googleTrends = require('google-trends-api');

const getAllResults = query => {
  return googleTrends.interestByRegion({
    keyword: query,
    geo: 'US',
    resolution: 'DMA'
  });
};

const getMedResult = query => {
  getAllResults(query).then(result => {
    console.log("starting callback");
    const parsedJSON = JSON.parse(result);
    // console.log(result);
    // console.log(result["default"]);
    console.log(parsedJSON.default.geoMapData[55].value);
    console.log("done with callback");
  });
};

const findMid = result => {

};

module.exports = getMedResult;
