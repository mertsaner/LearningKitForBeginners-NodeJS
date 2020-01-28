// f7b1c6f118c7351e911db80ad99bd2fd
// https://api.darksky.net/forecast/f7b1c6f118c7351e911db80ad99bd2fd/41.096776,28.773819?units=si

const request = require('request');

const url = 'https://api.darksky.net/forecast/f7b1c6f118c7351e911db80ad99bd2fd/37.8267,-122.4233?units=si';

request({ url: url, json: true }, (error, response) => {
    console.log(response.body.currently);
});