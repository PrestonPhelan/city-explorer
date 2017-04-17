const googleTrends = require('google-trends-api');

const getAllResults = query => {
  // Basic API Call to Google Trends, gets data by metro area
  return googleTrends.interestByRegion({
    keyword: query,
    geo: 'US',
    resolution: 'DMA'
  });
};

const parseResults = rawResults => {
  // Takes the raw results, return an array of objects
  return JSON.parse(rawResults).default.geoMapData;
};

const getMedValue = parsed => {
  if (parsed.length >= 106) {
    return parsed[105].value[0];
  } else {
    return 1;
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

const sendAllQueries = queries => {
  let results = new Object;
  const totalLength = queries.length;

  const sendNextQuery = (queryList, sendTo, totalQueries) => {
    let query = queryList[0];
    console.log(`Starting query ${query}`);
    getAllResults(query).then( result => {
      console.log(`Got results for ${query}`);
      let parsed = parseResults(result);
      results[query] = parsed;
      if (queryList.length > 1) {
        sendNextQuery(queryList.slice(1), sendTo, totalQueries);
      } else {
        sendTo(results, totalQueries);
      }
      return;
    });
  };

  sendNextQuery(queries, sortResults, totalLength);
};

const sortResults = (results, numQueries) => {
  console.log("Sorting results...");
  let cities = new Object;
  Object.keys(results).forEach(query => {
    console.log(`Getting median for ${query}`);
    let median = getMedValue(results[query]);
    results[query].forEach(city => {
      console.log(`Calculating value for ${city.geoName}`);
      if (!cities[city.geoName]) {
        cities[city.geoName] = new Object;
        cities[city.geoName].name = city.geoName;
        cities[city.geoName].values = [];
      }
      cities[city.geoName].values.push(city.value[0] / median);
    });
  });

  console.log(cities);

  let cityRatings = [];
  Object.keys(cities).forEach( city => {
    console.log(`Calculating score for ${cities[city].name}`);
    let sum = cities[city].values.reduce( (acc, cur) => acc + cur, 0 );
    cityRatings.push([cities[city].name, sum / numQueries]);
  });

  console.log("Unsorted city ratings:");
  console.log(cityRatings);

  cityRatings.sort( (a, b) => b[1] - a[1] );
  console.log("Sorted city ratings");
  console.log(cityRatings);
  return cityRatings;
};

module.exports = sendAllQueries;
