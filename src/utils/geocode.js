const request = require('request');

const geocodeActual = (address, callback) => {
//GEOCODE api
    //const url = `https://api.darksky.net/forecast/c82568e73f1963c8028c99c75a94b7f3/${address}`;
    const url = `https://api.darksky.net/forecast/c82568e73f1963c8028c99c75a94b7f3/${encodeURIComponent(address)}`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location, Try another search', undefined);
        } else {
            callback(undefined, response.body.currently);
        }
    });
};

const geocode = (address, callback) => {
    if (address)
    {
        callback(undefined, { latitude: 13.0827, longitude: 80.2707, location: 'Chennai, Tamil Nadu, India'})
    } else {
        callback('Unable to find location, Try another search', undefined);
    }
    
};

module.exports = geocode;