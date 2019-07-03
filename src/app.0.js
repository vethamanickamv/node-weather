const path = require('path');
const express = require('express');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

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
         title: 'App Hbs',
         name: 'Vetha'
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
        helpText: 'This is my node course help text'
    });
});

app.get('/weather', (req, res) => {
    res.send({
            forecast: 'It is raining',
            location: 'India'
        });
});


//stthomaschurch.com
//stthomaschurch.com/about
//stthomaschurch.com/help

//start and listen the web server
app.listen(3000, () => {
    console.log('Server is up and running in port 3000')
});