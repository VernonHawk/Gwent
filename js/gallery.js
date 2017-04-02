var Templates = require('./Templates');
$(document).ready(function () {

    function showGallery() {
        $("#gallery").html("");

        function showOneCard(card) {
            var html_code = Templates.OneGalleryCard();
            var node = $(html_code);
            var Card_ID = card._id;

            node.find(".gallery-card").attr("src", "../finalCardImg/" + Card_ID + ".png");
            node.find(".gallery-card-image-final").attr("src", "../finalCardImg/" + Card_ID + ".png");
            node.find('[name = modal-button]').attr("data-target", "#" + Card_ID);
            node.find(".modal").attr("id",Card_ID);
            node.find('[name = name-modal]').val(card.name);
            node.find('[name = tags-modal]').val(card.tags);
            node.find('[name = description-modal]').val(card.description);
            node.find(".gallery-card").click(function () {
                node.find('[name = modal-button]').click();
            });

            $("#gallery").append(node);
        }

        $.ajax({
            url: '/api/get-card-list/',
            type: 'GET',
            success: function (data) {
                console.log('load successful!\n' + data);
                data.forEach(showOneCard)
            },
            error: function() {
                callback(new Error("Ajax Failed"));
            }
        });
    }

    showGallery();
});