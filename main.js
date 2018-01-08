const colours = ["green", "red", "blue", "yellow"];
const freqs = [220, 277, 330, 440];
var strictMode = false, winLevel = 20, timeSpacing = 800, gameOverTimeout = 5000;
const MIN_WIN_LEVEL = 5, MAX_WIN_LEVEL = 100, MIN_TS_VALUE = 0.1, MAX_TS_VALUE = 2, MIN_GOT_VALUE = 1, MAX_GOT_VALUE = 10;

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

    $(".strict-toggle").text(strictMode==false?"Off":"On");
    $(".win-input").val(winLevel);
    $(".ts-input").val(timeSpacing/1000);
    $(".got-input").val(gameOverTimeout/1000);

    $(".strict-toggle").click(function() {
        $(".strict-toggle").text($(".strict-toggle").text()=="On"?"Off":"On");
    });

    $(".save").click(function() {
        strictMode = $(".strict-toggle").text()=="On";
        var winInput = parseInt($(".win-input").val());
        var tsInput = parseFloat($(".ts-input").val());
        var gotInput = parseFloat($(".got-input").val());
        if(winInput >= MIN_WIN_LEVEL && winInput <= MAX_WIN_LEVEL) {
            removeError(".win-input");
            winLevel = winInput;
        } else {
            errorIndicate(".win-input");
        }
        if(tsInput >= MIN_TS_VALUE && tsInput <= MAX_TS_VALUE) {
            timeSpacing = tsInput * 1000;
            removeError(".ts-input");
        } else {
            errorIndicate(".ts-input");
        }
        if(gotInput >= MIN_GOT_VALUE && gotInput <= MAX_GOT_VALUE) {
            gameOverTimeout = gotInput * 1000;
            removeError(".got-input");
        } else {
            errorIndicate(".got-input");
        }
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


function errorIndicate(className) {
    $(className).addClass("error");
}

function removeError(className) {
    $(className).removeClass("error");
}