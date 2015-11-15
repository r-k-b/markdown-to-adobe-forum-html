var express = require('express'),
    winston = require('winston');

// until we can debug from webstorm through heroku's loader, this is required
if (!process.env['ENV_LOADED']) {
    require('dotenv').load();
}

winston.level = (process.env['LOGLEVEL'] || 'debug');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('pages/index');
});


app.listen(
    app.get('port'),
    () => winston.info(`Node app is running on port ${app.get('port')}`)
);