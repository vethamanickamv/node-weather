const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * Configure static folder for rendering
 * app.use(express.static(publicDirectoryPath));
 * app.get('', (req, res) => {
     res.render('index');
    });
 */
//Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath); //by default it will look for views folder inside web-server
hbs.registerPartials(partialsPath);

//Setup staic directory to serve
app.use(express.static(publicDirectoryPath));


/**
 * Send Text
 * app.get('', (req, res) => {
 *     res.send('Hello express!');
 * });
 * 
 * Send Html
 * app.get('', (req, res) => {
 *     res.send(<h1>Hello express!</h1>');
 * });
 * 
 * Send json
 * app.get('', (req, res) => {
 *     res.send([{name: 'vetha}, { name: 'prem'}]);
 * });
 * 
 */

 app.get('', (req, res) => {
     res.render('index', {
         title: 'Weather',
         name: 'Vethamanickam V'
     });
 });

 app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vethamanickam V'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vethamanickam V'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide latitude and longitude'
        });
    }
    // if(!req.query.latitude || !req.query.longitude) {
    //     return res.send({
    //         error: 'You must provide latitude and longitude'
    //     });
    // }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send(error);
        }
        
        //chaining
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }
            res.send({
                forecast: forecastData.summary,
                location,
                address: req.query.address
            });
        });
    });
});

//accepting query string
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products:[]
    })
});


//wildcard
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        message: 'Help article not found',
        name: 'Vethamanickam V'
    });
});
app.get('*',(req, res) => {
    res.render('404', {
        title: '404 Not Found',
        message: 'Page not found',
        name: 'Vethamanickam V'
    });
});


//stthomaschurch.com
//stthomaschurch.com/about
//stthomaschurch.com/help

//start and listen the web server
app.listen(3000, () => {
    console.log('Server is up and running in port 3000')
});