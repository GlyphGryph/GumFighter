NSTC.IntroScreen = function(game){};
NSTC.IntroScreen.prototype = {
  create: function(){
    this.title = this.game.add.text(0, 0, "GUMFIGHTER", { fill: '#FCC', fontSize: 82 });
    this.directions = this.game.add.text(0, 0, "Press 'Enter' to continue", { fill: '#FFF' });
    this.title.x = this.game.width/2 - this.title.width/2;
    this.title.y = this.game.height/2 - this.title.height;
    this.directions.x = this.game.width/2 - this.directions.width/2;
    this.directions.y = this.title.bottom + this.directions.height;
  },
  update: function(){
    this.game.keyManager.update();
    if(this.game.keyManager.isReleased('enter')){
      this.state.start('SelectionScreen', true, false, this.getSelectedOption().songData);
    }
  }
}
