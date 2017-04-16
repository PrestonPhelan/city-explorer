const googleTrends = require('google-trends-api');

const getAllResults = query => {
  return googleTrends.interestByRegion({
    keyword: query,
    geo: 'US',
    resolution: 'DMA'
  });
};

const getMedValue = parsed => {
  if (parsed.length >= 106) {
    return parsed[105].value[0];
  } else {
    return 0.1;
  }
};

const getCityRelativeValue = (cityString, query) => {
  getAllResults(query).then(result => {
    const parsedJSON = JSON.parse(result).default.geoMapData;
    // console.log(parsedJSON);
    const median = getMedValue(parsedJSON);
    // console.log(median);
    const city = parsedJSON.find( element => element.geoName === cityString );
    // console.log(city);
    const cityValue = city.value[0];
    // console.log(cityValue);
    // console.log(cityValue / median);
    return cityValue / median;
  });
};

const makeApiCalls = queries => {
  let results = new Object;
  let queriesLeft = queries.length;
  queries.forEach( query => {
    getAllResults(query).then(result => {
      results[query] = JSON.parse(result).default.geoMapData;
      --queriesLeft;
      if (queriesLeft <= 0) {
        console.log("Done with queries");
        console.log(results);
        return results;
      } else {
          console.log("Still waiting...");
        }
    });
  });
};

module.exports = makeApiCalls;
