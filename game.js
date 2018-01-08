class Game {
    constructor(strictMode, winLevel, timeSpacing, gameOverTimeout) {
        this.level = 0;
        this.gameTimeoutTime = gameOverTimeout;
        this.gameTimeout = null;
        this.timeSpacing = timeSpacing;
        this.holdDuration = timeSpacing/2;
        this.btnPattern = [];
        this.seqIndex = 0;
        this.pressInterval = null;
        this.strictMode = strictMode;
        this.winLevel = winLevel;
        this.playSequence(false);
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
        $(".level").text("LOSE");
        this.disableButtons();
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

    playSequence(fromFail) {
        clearTimeout(this.gameTimeout);
        this.disableButtons();
        var self = this; //scope
        if(!fromFail) { //for non strict mode, only adds extra step if the player didnt hit the wrong button
            this.addExtraStep();
            this.updateLevelText();
        } else {
            $(".level").text("!!");
            setTimeout(function() {
                self.updateLevelText()
            }, 1000);

        }
        //a timeout here
        var ind = 0;
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
        clearTimeout(this.gameTimeout);
        this.gameTimeout = setTimeout(function() {
            self.gameOver();
        }, this.gameTimeoutTime);
    }

    //handle user clicking buttons
    checkSequence(button) {
        this.startGameOverTimeout();
        if(button==this.btnPattern[this.seqIndex]) {
            this.seqIndex++;
            if(this.seqIndex == this.btnPattern.length) {
                if(this.seqIndex == this.winLevel) {
                    this.gameWin();
                } else {
                    setTimeout(this.playSequence(false), this.timeSpacing);
                    this.seqIndex = 0;
                }
            }
        } else {
            if(this.strictMode == true) {
                $(".level").text("!!");
                this.gameOver();
            } else {
                setTimeout(this.playSequence(true), this.timeSpacing);
                this.seqIndex = 0;
            }
        }
    }
}
