var $ = require("jquery");
var arDrone = require("ar-drone");
var client = arDrone.createClient();
var pngStream = client.getPngStream();
var flightState = false;

client.on("navdata", function(data) {
    console.log(data);
});
pngStream.on("data", function (frame) {
    var base64Image = new Buffer(frame, "binary").toString("base64");
    requestAnimationFrame(function() {
        $("img").attr("src", 'data:image/png;base64,' + base64Image);
    });
});

$(function () {
    $("a").on("click", function () {
        var control = $(this);
        if(control.hasClass("takeOff")) {
            flightState = client.takeoff();
            if (flightState) {
                control.removeClass("takeOff").addClass("land").html("Land");
            }
        } else if (control.hasClass("land")) {
            flightState = !client.land();
            if (!flightState) {
                control.removeClass("land").addClass("takeOff").html("TakeOff");
            }
        }
    });
});