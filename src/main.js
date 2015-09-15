window.onload = function(){
  var game = new Phaser.Game(width, height, Phaser.CANVAS, document.getElementById("main"));
  game.keyManager = new NSTC.KeyManager(game);
  game.state.add('Boot', NSTC.Boot);
  game.state.add('Preloader', NSTC.Preloader);
  game.state.add('IntroScreen', NSTC.IntroScreen);
  game.state.add('SelectionScreen', NSTC.SelectionScreen);
  game.state.add('GameScreen', NSTC.GameScreen);
  game.state.start('Boot');
}
