const configData = require('../config/config.json')


// Function to fetch the curremt weather of the selectd city
export function CallWeatherAPI(city){ 
    return new Promise((resolve, reject) => {
        let baseUrl = configData.wetaherstack_url + configData.resources.current + "?access_key=" + configData.access_key + "&query=" +city;
        console.log(baseUrl);
        fetch(baseUrl)
          .then(response => response.json())
          .then(apiResult => {
            resolve(apiResult);
            console.log(apiResult)
          })
          .catch(err => {
            reject(err);
          })
      });
}

// Function to fetch the nearby cities of the selectd city
export function CallCitiesAPI(city){
  return new Promise((resolve, reject) => {
    let baseUrl = 'http://getnearbycities.geobytes.com/GetNearbyCities?Radius=170&units=km&Limit=10&locationcode='+city
    fetch(baseUrl)
      .then(response => response.json())
      .then(apiResult => {
        apiResult=apiResult.slice(1)
        let  cityArray = new Array()
        apiResult.map((item) => {
            cityArray.push(item[1])
        });
        resolve(cityArray);
        console.log(cityArray);
      })
      .catch(err => {
        reject(err);
      })
  });
}