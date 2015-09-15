NSTC.SelectionScreen = function(game){};
NSTC.SelectionScreen.prototype = {
  create: function(){
    this.columns = [
      {color:0x9999FF, joinKey: "a", name: "Fred"},
      {color:0x99FF99, joinKey: "s", name: "Tony"},
      {color:0xFFFF99, joinKey: "w", name: "Joe"},
      {color:0x99FFFF, joinKey: "d", name: "Albert"}
    ]
    
    var column, background;
    for(var ii=0;ii<this.columns.length;ii+=1){
      column = this.columns[ii];
      column.width = this.game.width/this.columns.length
      column.height = this.game.height;
      column.left = column.width * ii;
      background = new Phaser.Graphics().beginFill(column.color).drawRect(0,0,column.width,column.height);
      column.background = this.game.add.sprite(column.left, 0, background.generateTexture());
      column.joinText = this.game.add.text(
        0, this.game.height/2,
        "Press '"+column.joinKey+"' to join",
        { fill: '#000', fontSize: 12 }
      )
      column.joinText.x = column.left+column.width/2-column.joinText.width/2;
      column.joined = false;
    }

    this.playerJoined = false;
  },
  join: function(column){
    column.joined = true;
    if(!this.playerJoined){
      this.playerJoined = true;
      this.directionsText = this.game.add.text(0,20,"Press 'Enter' to begin game now!", { fill: "#000", fontSize: 16 })
      this.directionsText.x = this.game.width/2 - this.directionsText.width/2
    }
  },
  update: function(){
    this.game.keyManager.update();
    var column;
    for(var ii=0;ii<this.columns.length;ii+=1){
      column = this.columns[ii];
      if(!column.joined && this.game.keyManager.isReleased(column.joinKey)){
        column.joinText.text = "Welcome, "+column.name+"!";
        column.joinText.x = column.left+column.width/2-column.joinText.width/2;
        this.join(column);
      }
    }
    if(this.playerJoined && this.game.keyManager.isReleased("enter")){
      this.state.start('GameScreen', true, false, this.columns);
    }
  }
}
