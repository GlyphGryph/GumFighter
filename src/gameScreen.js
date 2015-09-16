NSTC.GameScreen = function(game){};
NSTC.GameScreen.prototype = {
  init: function(joinData){
    this.players = joinData.players;
    this.columns = joinData.columns;
  },
  create: function(){
    this.background = {}
    var graphic = new Phaser.Graphics().beginFill(0x9999FF).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.sky = this.game.add.sprite(0, 0, graphic.generateTexture());
    graphic = new Phaser.Graphics().beginFill(0x99FF99).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.ground = this.game.add.sprite(0, this.game.height/2, graphic.generateTexture());

    this.messages = {
      chewDirection: function(player){ return "Alternate '"+player.leftKey+"' and '"+player.rightKey+"' to chew!" },
      chewStart: "Begin chewing!",
      chewContinue: "Keep going!",
      chewAlmostAchieved: "Almost there!",
      chewAchieved: "Perfect!",
      chewAlmostOver: "Woah, hold on!",
      chewOver: "OVER TENDERIZED! :(",
      blowDirection: function(player){ return "Hold '"+player.selectKey+"' to breathe in,\npress '"+player.leftKey+"' and '"+player.rightKey+"' to steady!" },
      blowStart: "Blow! Blow! Blow!"
    }

    var player;
    for(var ii=0;ii<this.players.length;ii+=1){
      player = this.players[ii];
      graphic = new Phaser.Graphics().beginFill(0xFFFFFF).drawCircle(0,0,50,50);
      player.character = this.game.add.sprite(0, 0, graphic.generateTexture());
      player.character.y = this.game.height/2 - player.character.height;
      player.character.x = player.left+player.width/2-player.character.width/2;

      player.chewValue = 0;
      player.chewSpeed = 0;
      player.optimalChewMin = 84000;
      player.optimalChewMax = 88000;
      player.chewMax = 100000;
      player.balanceMax = 6000;
      player.balanceEdge = 2000;
      player.balance = 0;
      player.balanceSpeed = 0;
      player.breathMax = 5000;
      player.breath = player.breathMax;
      player.bubbleSize = 0;
      player.bubbleHealth = 10000;
      player.state = "chewing";

      player.directionText = this.game.add.text(
        0, this.game.height/2+10,
        this.messages.chewDirection(player),
        { fill: '#000', fontSize: 12, align: 'center' }
      )
      player.directionText.x = player.left+player.width/2-player.directionText.width/2;

      player.progressText = this.game.add.text(
        0, this.game.height/2+60,
        this.messages.chewStart,
        { fill: '#000', fontSize: 12, align: 'center' }
      )
      player.progressText.x = player.left+player.width/2-player.progressText.width/2;

      
      player.statText = this.game.add.text(0, this.game.height/2+100,"",{ fill: '#000', fontSize: 12 })
      this.updateStatText(player);
      this.floatText(player, "GO!");
    }
  },
  updateStatText(player){
    player.statText.text = "";
    if(player.state == "chewing"){
      player.statText.text += "Chew Value: "+player.chewValue+"\n";
      player.statText.text += "    Speed: "+player.chewSpeed+"\n";
      player.statText.text += "    Target: "+player.optimalChewMin+"-"+player.optimalChewMax+"\n";
    } else if(player.state == "blowing"){
      player.statText.text += "Tenderness: "+player.tenderness+"%\n";
      player.statText.text += "Breath: "+player.breath+" / "+player.breathMax+"\n";
      player.statText.text += "Balance: "+player.balance+"\n";
      player.statText.text += "Bubble Size: "+player.bubbleSize+"\n";
      player.statText.text += "Bubble Health: "+player.bubbleHealth;
    }
    player.statText.x = player.left+player.width/2-player.statText.width/2;
  },
  updateState: function(player){
    if(player.state == "chewing"){
      if(this.game.keyManager.isReleased(player.leftKey) || this.game.keyManager.isReleased(player.rightKey)){
        player.chewSpeed+=10;
      }
      player.chewValue += player.chewSpeed;
      if(player.chewValue > player.chewMax){ player.chewValue = player.chewMax; }
      player.chewSpeed -= 1;
      if(player.chewSpeed <= 0){ player.chewSpeed = 0; }

      if(player.chewValue > player.optimalChewMax){
        player.progressText.text = this.messages.chewOver;
      } else if(player.chewValue > (player.optimalChewMax - (player.optimalChewMax - player.optimalChewMin)/3)){
        if(player.chewSpeed > 0){
          player.progressText.text = this.messages.chewAlmostOver;
        } else {
          player.progressText.text = this.messages.chewAchieved;
        }
      } else if(player.chewValue > player.optimalChewMin){
        player.progressText.text = this.messages.chewAchieved;
      } else if(player.chewValue > player.optimalChewMin/2){
        player.progressText.text = this.messages.chewAlmostAchieved;
      } else if(player.chewValue > 0){
        player.progressText.text = this.messages.chewContinue;
      } else {
        player.progressText.text = this.messages.chewStart;
      }
      player.progressText.x = player.left+player.width/2-player.progressText.width/2;

      if(player.chewValue > player.optimalChewMin && player.chewSpeed == 0){
        player.state = "doneChewing";
      }
    } 
    if(player.state == "doneChewing"){
      if(player.chewValue > player.optimalChewMax){
        var pastMax = player.chewValue - player.optimalChewMax;
        var pastZone = player.chewMax - player.optimalChewMax;
        player.tenderness = Match.floor(100 - 100*(pastMax/pastZone));
        this.floatText(player, "YEUGH!");
      }else{
        player.tenderness = 100;
        this.floatText(player, "TENDER!");
      }
      player.directionText.text = this.messages.blowDirection(player);
      player.directionText.x = player.left+player.width/2-player.directionText.width/2;
      player.progressText.text = this.messages.blowStart;
      player.progressText.x = player.left+player.width/2-player.progressText.width/2;
      player.state = "blowing";
    }
    if(player.state == "blowing"){
      if(this.game.keyManager.isHeld(player.rightKey)){
        player.balanceSpeed += 1;
      }
      if(this.game.keyManager.isHeld(player.leftKey)){
        player.balanceSpeed -= 1;
      }
      player.balance += player.balanceSpeed;
      if(player.balance > player.balanceMax){
        player.balance = player.balanceMax;
        player.balanceSpeed = 0;
      }else if(player.balance < -player.balanceMax){
        player.balance = -player.balanceMax;
        player.balanceSpeed = 0;
      }
    }
    this.updateStatText(player);
  },
  floatText: function(player, words){
    var text = this.game.add.text(
      0, player.character.top-30,
      words,
      { fill: '#000', fontSize: 12 }
    )
    text.x = player.left+player.width/2-text.width/2;
    text.rotation = -0.1;
    var tween = this.game.add.tween(text).to( { alpha: 0.0, y: text.y - 60 }, 1000, Phaser.Easing.Default, true);
    tween.onComplete.add(function(){text.destroy();})
  },
  update: function(){
    this.game.keyManager.update();
    var player;
    for(var ii=0;ii<this.players.length;ii+=1){
      player = this.players[ii];
      this.updateState(player);
      if(this.game.keyManager.isReleased('enter')){
        player.state = "doneChewing";
      }
    }
  }
}
