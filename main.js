$(document).ready(function() {
    var colours = ["green", "red", "blue", "yellow"];
    var mouseDown = false;
    colours.forEach(function(element) {
        console.log("H");
        var btnClass = "."+element+"-button";
        var activeClass = "simon-active";
        $(btnClass).on("mousedown", function() {
            $(btnClass).addClass(activeClass);
            mouseDown = true;
        });
        $(btnClass).on("mouseup", function() {
            $(btnClass).removeClass(activeClass);
            mouseDown = false;
        });
        $(btnClass).on("mouseleave", function() {
            if(mouseDown) {
                $(btnClass).mouseup();
            }
        });
        $(btnClass).click(function() {
            window[element+"Click"]();
        });
    });

});

function greenClick() {
    alert("green");
}

function redClick() {
    alert("red");
}

function blueClick() {
    alert("blue");
}

function yellowClick() {
    alert("yellow");
}