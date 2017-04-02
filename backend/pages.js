exports.mainPage = function(req, res) {
    res.render('index', {
        pageTitle: 'Gwent Card Make'
    });
};

exports.gallery = function(req, res) {
    res.render('gallery', {
        pageTitle: 'Gallery'
    });
};