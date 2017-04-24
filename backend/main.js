var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    app.post('/api/make-card/', api.makeCard);

    app.get('/api/get-card-list/', api.getCardList);

    app.get('/', pages.mainPage);

    app.get('/gallery.html', pages.gallery);

    app.use(express.static(path.join(__dirname, '..')));
}

function startServer() {
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    configureEndpoints(app);

    app.listen(5050, function () {
        console.log('My Application Running on http://localhost:'+5050+'/');
    });
}

exports.startServer = startServer;