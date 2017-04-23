var mongoose = require('mongoose');
mongoose.connect('mongodb://gwentredactordb:v5CiKmJVxkaQdo2mSyuNNepMJZbgEJqyrKuIl18YubhL95RNwFTyITxGjkM6CDVe1RZuCgRIlbVRoIlspMWhzw==@gwentredactordb.documents.azure.com:10250/?ssl=true');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var fs = require('fs');
var images = require("images");
var formidable = require('formidable');
var path = require('path');

var CardSchema = new mongoose.Schema({
    kind: String,
    type: String,
    faction: String,
    rarity: String,
    lane: String,
    ability: String,
    loyalty: String,
    power: Number,
    name: String,
    tags: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Card = mongoose.model('Card', CardSchema);

exports.makeCard = function(req, res) {
    var CardInfo = new Card({});

    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '/uploads');

    var filePath;
    form.on('file', function(field, file) {
        filePath =  path.join(form.uploadDir, file.name);

        fs.rename(file.path, filePath);
    });

    form.on('field', function(field, value) {
        CardInfo[field] = value;
    });

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        var CardID = 0;

        CardInfo.save(function(err, card){
            if(!err) {
                CardID = card._id;
                images("img/None.png")
                    .draw(images(filePath).resize(608, 808),174,170)
                    .draw(images("img/borders/border" + CardInfo.type + ".png"), 0, 0)
                    .draw(images("img/banners/banner"+ CardInfo.faction + (CardInfo.type == "Golden"? "Golden": "") + ".png"), 0, 0)
                    .draw(images("img/gems/rarity"+ CardInfo.rarity +".png"), 0, 0)
                    .draw(images("img/icons/" + (CardInfo.lane == "None"? "None": "lane"+ CardInfo.lane) + ".png"), 0, 0)
                    .draw(images("img/icons/" + (CardInfo.ability == "None"? "None": "ability"+ CardInfo.ability) + ".png"), 0, 0)
                    .draw(images("img/icons/" + (CardInfo.loyalty == "Loyal"? "None": "loyaltyDisloyal") + ".png"), 0, 0)
                    .save('finalCardImg/' + CardID + '.png', {
                        quality : 99
                    });
                res.end(CardID + '.png');
            }else{
                console.log("CAN'T SAVE CARD: " + err);
            }
        });
    });

    form.parse(req);
};

exports.getCardList = function(req, res) {
    Card.find(function (err, cards) {
        if(!err) {
            res.json(cards)
        }else{
            console.log("CAN'T LOAD CARDS: " + err);
        }
    });

};