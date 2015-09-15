NSTC.IntroScreen = function(game){};
NSTC.IntroScreen.prototype = {
  create: function(){
    this.game.add.text(250, 50, "GUM FIGHTER!", { fill: '#FFF' });
    this.game.add.text(250, 250, "Press 'Enter' to continue", { fill: '#FFF' });
  },
  update: function(){
    this.game.keyManager.update();
    if(this.game.keyManager.isReleased('enter')){
      this.state.start('SelectionScreen', true, false, this.getSelectedOption().songData);
    }
  }
}
