var $ = require("jquery");
var arDrone = require("ar-drone");
var client = arDrone.createClient();
var videoStream = client.getVideoStream();
var flightState = false;

client.on("navdata", console.log);
videoStream.on("data", console.log);

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