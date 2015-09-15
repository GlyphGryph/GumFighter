NSTC.GameScreen = function(game){};
NSTC.GameScreen.prototype = {
  init: function(joinData){
    this.playerData = joinData;
    console.log(joinData);
  },
  create: function(){
    this.background = {}
    var graphic = new Phaser.Graphics().beginFill(0x9999FF).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.sky = this.game.add.sprite(0, 0, graphic.generateTexture());
    graphic = new Phaser.Graphics().beginFill(0x99FF99).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.ground = this.game.add.sprite(0, this.game.height/2, graphic.generateTexture());

    var player;
    for(var ii=0;ii<this.playerData.length;ii+=1){
      player = this.playerData[ii];
      if(player.joined){
        graphic = new Phaser.Graphics().beginFill(0xFFFFFF).drawCircle(0,0,50,50);
        player.character = this.game.add.sprite(0, 0, graphic.generateTexture());
        player.character.y = this.game.height/2 - player.character.height;
        player.character.x = player.left+player.width/2-player.character.width/2;
        
      }
    }
  },
  update: function(){
    this.game.keyManager.update();
  }
}
