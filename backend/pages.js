exports.mainPage = function(req, res) {
    res.render('index', {
        pageTitle: 'Gwent Redactor'
    });
};

exports.gallery = function(req, res) {
    res.render('gallery', {
        pageTitle: 'Gallery'
    });
};