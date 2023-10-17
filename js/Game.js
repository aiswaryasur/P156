
AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#treasureCoins" },      
    },
    
    update: function() {
      this.isCollided(this.data.elementId);
    },
    init: function () {
      var duration = 120;
      const timerEl = document.querySelector("#time");
      this.startTimer(duration, timerEl);
    },
  
    isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", e => {
        if (elementId.includes("#treasureCoins")) {          
          console.log("coin collision");
          this.updateScore();
          this.updateTargets();
        }
        else if(elementId.includes("#fishModels")){
          console.log("fish collision");
          this.gameOver();
        }         
      });
    },
    updateScore: function () {
      var element = document.querySelector("#score");
      var count = element.getAttribute("text").value;
      var currentScore = parseInt(count);
      currentScore += 50;
      element.setAttribute("text", {
      value: currentScore,
      });
      },
      updateTargets: function(){
        var element=document.querySelector('#targets')
        var count = element.getAttribute('text').value
        var currentTargets = parseInt(count)
        currentTargets-=1
        element.setAttribute('text',{value:currentTargets})
    
      },
      startTimer: function (duration, timerEl) {
        var minutes;
        var seconds;
        setInterval(() => {
        if (duration>=0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration %60);
        if (minutes < 10) {
        minutes = "0" + minutes;
        }
        if (seconds < 10) {
        seconds = "0" + seconds;
        }
        timerEl.setAttribute("text", {value: minutes + ":" + seconds,
        });
        duration-=1;
        }
        else {
        this.gameOver();
        }
        }, 1000)
      },
      gameOver: function(){
        var diverEl = document.querySelector('#scuba_driver')
        var overEl = document.querySelector('#gameOver')
        overEl.setAttribute('visible',true)
        diverEl.setAttribute('dynamic-body',{mass:1})
      },
  });
  