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
      player.bubbleSize = 0;
      player.bubbleHealth = 100;

      player.directionText = this.game.add.text(
        0, this.game.height/2+10,
        "Alternate '"+player.leftKey+"' and '"+player.rightKey+"' to chew!",
        { fill: '#000', fontSize: 12 }
      )
      player.directionText.x = player.left+player.width/2-player.directionText.width/2;

      
      player.statText = this.game.add.text(0, this.game.height/2+100,"",{ fill: '#000', fontSize: 12 })
      this.updateStatText(player);
    }
  },
  updateStatText(player){
    player.statText.text = "Chew Value: "+player.chewValue+"\n";
    player.statText.text += "    Speed: "+player.chewSpeed+"\n";
    player.statText.text += "    Target: "+player.optimalChewMin+"-"+player.optimalChewMax+"\n";
    player.statText.text += "Bubble Size: "+player.bubbleSize+"\n";
    player.statText.text += "Bubble Health: "+player.bubbleHealth;
    player.statText.x = player.left+player.width/2-player.statText.width/2;
  },
  update: function(){
    this.game.keyManager.update();
    var player;
    for(var ii=0;ii<this.players.length;ii+=1){
      player = this.players[ii];
      if(this.game.keyManager.isReleased(player.leftKey) || this.game.keyManager.isReleased(player.rightKey)){
        player.chewSpeed+=10;
      }
      player.chewValue += player.chewSpeed;
      player.chewSpeed -= 1;
      if(player.chewSpeed <= 0){ player.chewSpeed = 0; }
      this.updateStatText(player);
    }
  }
}
