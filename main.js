const colours = ["green", "red", "blue", "yellow"];
const freqs = [220, 277, 330, 440];
var strictMode = false, winLevel = 20, timeSpacing = 800, gameOverTimeout = 5000;

$(document).ready(function() {
    var game;


    $(".start").click(function() {
        game = new Game(strictMode, winLevel, timeSpacing, gameOverTimeout);
        $(".start").addClass("unclickable");
    });

    $(".restart").click(function() {
        game.restart();
        $(".start").click();
    });

    $(".settings").click(function() {
        $(".wrapper").addClass("off");
        $(".settings-wrapper").removeClass("off");
    });

    $(".close").click(function() {
        $(".settings-wrapper").addClass("off");
        $(".wrapper").removeClass("off");
    });




    var mouseDown = false;
    colours.forEach(function(element,index) {
        var btnClass = "."+element+"-button";
        var activeClass = "simon-active";
        var audioCtx = new window.AudioContext();
        var btnAudio;
        $(btnClass).on("mousedown", function() {
            $(btnClass).addClass(activeClass);
            mouseDown = true;
            //keep looping audio
            btnAudio = audioCtx.createOscillator();
            btnAudio.frequency.value = freqs[index];
            btnAudio.connect(audioCtx.destination);
            btnAudio.start();
        });
        $(btnClass).on("mouseup", function() {
            $(btnClass).removeClass(activeClass);
            mouseDown = false;
            //stop audio
            btnAudio.stop();
            
        });
        $(btnClass).on("mouseleave", function() {
            if(mouseDown) {
                $(btnClass).mouseup();
            }
        });
        $(btnClass).click(function() {
            btnAudio.stop();
            game.checkSequence(element);
        });
    });

});