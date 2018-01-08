class Game {
    constructor() {
        this.level = 0;
        this.gameTimeoutTime = 5000;
        this.gameTimeout = null;
        this.timeSpacing = 1000;
        this.holdDuration = 250;
        this.btnPattern = [];
        this.seqIndex = 0;
        this.pressInterval = null;
        this.winLevel = 5;
        this.playSequence();
     }

    restart() {
        this.level = 0;
        clearInterval(this.pressInterval);
        clearTimeout(this.gameTimeout);
        this.pressInterval=null;
        this.btnPattern = [];
        this.seqIndex = 0;
        this.updateLevelText();
    }

    gameOver() {
        clearInterval(this.pressInterval);
        clearTimeout(this.gameTimeout);
        this.btnPattern = [];
        $(".level").text("!!");
        this.seqIndex = 0;
    }

    gameWin() {
        clearInterval(this.pressInterval);
        clearTimeout(this.gameTimeout);
        this.btnPattern = [];
        $(".level").text("WIN!");
        this.disableButtons();
        this.seqIndex = 0;
    }

    updateLevelText() {
        $(".level").text(this.level);
     }

     playSequence() {
        this.disableButtons();
        this.addExtraStep();
        this.updateLevelText();
        //a timeout here
        var ind = 0;
        var self = this; //scope
        this.pressInterval = setInterval(function() {
            self.registerButtonClick(self.btnPattern[ind]);
            ind++;
        }, this.timeSpacing);
         setTimeout(function() {
             self.enableButtons();
             self.startGameOverTimeout();
         },(this.holdDuration+this.timeSpacing)*(this.btnPattern.length));
     }

     addExtraStep() {
        var randB = Math.floor(Math.random()*4); //random from 0 - 3
        this.btnPattern.push(colours[randB]);
        this.level++;
     }

     registerButtonClick(buttonColour) {
         var btnClass = "."+buttonColour+"-button";
        $(btnClass).mousedown();
        setTimeout(function() {
            $(btnClass).mouseup();
        }, this.holdDuration);
        
     }

     disableButtons() {
         colours.forEach(function(element) {
            $("."+element+"-button").addClass("unclickable");
         });
     }

     enableButtons() {
        colours.forEach(function(element) {
           $("."+element+"-button").removeClass("unclickable");
        });
    }

    startGameOverTimeout() {
        var self = this;
        this.gameTimeout = setTimeout(function() {
            self.gameOver();
        }, this.gameTimeoutTime);
    }

    //handle user clicking buttons
    checkSequence(button) {
        clearTimeout(this.gameTimeout);
        this.gameTimeout = setTimeout(function() {
            this.gameOver();
        }, this.gameTimeoutTime);
        var mistake = false;
        if(button==this.btnPattern[this.seqIndex]) {
            this.seqIndex++;
            if(this.seqIndex == this.btnPattern.length) {
                if(this.seqIndex == this.winLevel) {
                    this.gameWin();
                } else {
                    setTimeout(this.playSequence(), this.timeSpacing);
                    this.seqIndex = 0;
                }
            }
        } else {
            mistake=true;
            $(".level").text("!!");
            this.gameOver();
        }
    }
}
