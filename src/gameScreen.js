NSTC.GameScreen = function(game){};
NSTC.GameScreen.prototype = {
  init: function(joinData){
    this.joinData = joinData;
  },
  create: function(){
    this.background = {}
    var graphic = new Phaser.Graphics().beginFill(0x9999FF).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.sky = this.game.add.sprite(0, 0, graphic.generateTexture());
    graphic = new Phaser.Graphics().beginFill(0x99FF99).drawRect(0,0,this.game.width,this.game.height/2);
    this.background.ground = this.game.add.sprite(0, this.game.height/2, graphic.generateTexture());
  },
  update: function(){
    this.game.keyManager.update();
  }
}
