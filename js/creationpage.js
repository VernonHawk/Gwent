$(document).ready(function () {
var Templates = require('./Templates');

var uploadedimg = $("#image-layer");
var $node = $("#layers");

var Card = {
    kind: "Creature",
    type: "Bronze",
    faction: "Neutral",
    rarity: "Common",
    lane: "Melee",
    ability: "None",
    loyalty: "Loyal",
    power: 1,
    name: "",
    tags: "",
    description: ""
};

function updateCard(){
    var html_code = Templates.OneCard({card: Card});

    $node.empty();

    $node.append(html_code);
}

$("input").click(function () {
    Card[this.name] = this.value;

    updateCard();
});

$('[name = "ability"]').on('click', function() {
    if(this.value == "Timer")
        $("#timer-num-input-container").removeClass("hidden");
    else
        $("#timer-num-input-container").addClass("hidden");
});

$('[type = "text"]').on('input', function() {
    $("#card-" + this.name + "-show").val(this.value);
    $("#card-" + this.name + "-modal").val(this.value);
    Card[this.name] = this.value;
});

$('[type = "number"]').on('input', function() {
    if (this.value.length > 2) {
        this.value = this.value.slice(0,2);
    }
    Card[this.name] = this.value;
    updateCard();
});

$('[name = "description"]').on('input', function() {
    $("#card-" + this.name + "-show").val(this.value);
    $("#card-" + this.name + "-modal").val(this.value);
    Card[this.name] = this.value;
});

$('[name = "kind"]').on('change', function () {
    if(this.value == "Special"){
        Card.power = 0;
        Card.lane = "None";
        $('[value = "None"]').click();
        $('[value = "Loyal"]').click();
    }else{
        Card.power = 1;
        $("#power-input").val(1);
        $("#timer-num-input").val(1);
        $('[value = "Melee"]').click();
    }

    $(".creature-only").toggleClass("hidden");

    updateCard();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image-layer').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$('#img-load').on("change",function() {
    // fill fr with image data
    readURL(this);
});

uploadedimg.cropimg({
    resultWidth:                   300,
    resultHeight:                  435,
    displayZoomingButtons:         false,
    displayFixingPositionsButtons: false,
    displayFixingSizeButtons:      false
});

$(".move-img-btn").click(function () {
    $node.toggleClass("hidden");

    if($node.hasClass("hidden")){
        $(".move-img-btn").text("Stop");
    } else {
        $(".move-img-btn").text("Move Image");
    }
});

$('[name = finish-button]').click(function () {
    if($("#img-load").val()){
    var files = $("#img-load").get(0).files;

    var formData = new FormData();
    formData.append('file', files[0], files[0].name);

    formData.append('name', Card.name);
    formData.append('tags', Card.tags);
    formData.append('description', Card.description);

    formData.append('type', Card.type);
    formData.append('faction', Card.faction);
    formData.append('rarity', Card.rarity);

    formData.append('lane', Card.lane);
    formData.append('ability', Card.ability);
    formData.append('loyalty', Card.loyalty);

    formData.append('power', Card.power);

    $.ajax({
        url: '/api/make-card/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            //console.log('upload successful!\n' + data);
            $("#card-image-final").attr("src", "../finalCardImg/" + data);
        }
    });
    }
});

exports.updateCard = updateCard();
});
