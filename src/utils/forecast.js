const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c82568e73f1963c8028c99c75a94b7f3/${latitude},${longitude}`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Low level error, pass string for error', undefined);
        } else if (response.body.error) {
            callback('Coordinate error, pass string for error', undefined);
        } else {
            callback(undefined, response.body.currently);
        }
    });
};


module.exports = forecast;