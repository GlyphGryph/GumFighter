NSTC.SelectionScreen = function(game){};
NSTC.SelectionScreen.prototype = {
  create: function(){
    this.columns = [
      {color:0x9999FF},
      {color:0x99FF99},
      {color:0xFFFF99},
      {color:0x99FFFF}
    ]
    
    var column, background;
    for(var ii=0;ii<this.columns.length;ii+=1){
      column = this.columns[ii];
      background = new Phaser.Graphics().beginFill(column.color).drawRect(0,0,this.game.width/4,this.game.height);
      column.background = this.game.add.sprite(this.game.width/4 * ii, 0, background.generateTexture());
    }
  },
  update: function(){
    this.game.keyManager.update();
  }
}
