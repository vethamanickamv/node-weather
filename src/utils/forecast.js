const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c82568e73f1963c8028c99c75a94b7f3/${latitude},${longitude}`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Low level error, pass string for error', undefined);
        } else if (response.body.error) {
            callback('Coordinate error, pass string for error', undefined);
        } else {
            console.log(response.body.daily.data[0], response.body.currently);            
            const data = response.body.daily.data[0];
            const currently = response.body.currently;
            const content = `${data.summary}, It is currently ${currently.temperature} degrees out. This high today is ${data.temperatureHigh} with a low of ${data.temperatureLow}. There is a ${currently.precipProbability}% chance for rain`;
            callback(undefined, content);
        }
    });
};


module.exports = forecast;