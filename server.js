/*
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        if(query.action == "gallery"){
            displayGallery(res);
        }else if(req.url == "/"){
            displayForm(res);
        }else{
            displayFile(res, req.url);
        }

    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }
});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function displayGallery(res) {
    fs.readFile('gallery.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function displayFile(res, url) {
    console.log(url.substring(1));
    if(url != undefined){
        fs.readFile(url.substring(1), function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });}
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));

        var card = new Card({
            title: fields.name
        });

        card.save(function(err, movie_db){
            if(!err) {
                console.log(movie_db._id);
            }
        });
    });
}

    */

var main = require('./backend/main');
main.startServer(5050);