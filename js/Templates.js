var fs = require('fs');
var ejs = require('ejs');

exports.OneCard = ejs.compile(fs.readFileSync('./js/templates/OneCard.ejs', "utf8"));
exports.OneGalleryCard = ejs.compile(fs.readFileSync('./js/templates/OneGalleryCard.ejs', "utf8"));