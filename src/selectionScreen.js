NSTC.StartMenu = function(game){};
NSTC.StartMenu.prototype = {
  create: function(){
    this.options = [];
    this.selectedOptionId = 0;

    this.game.add.text(250, 50, "OUT_OF_LINE!", { fill: '#FFF' });
    this.menu = this.game.add.group();
    this.menu.position.x = 300;
    this.menu.position.y = 250;
    var newOption;
    var selectedGraphic = new Phaser.Graphics().beginFill(0x0000FF).drawRect(0,0,300,30);
    for(var ii=0; ii < this.game.songs.length; ii+=1){
      newOption = this.game.add.group(this.menu);
      newOption.outline = this.game.add.sprite(-20,0, selectedGraphic.generateTexture());
      newOption.outline.visible = false;
      newOption.add(newOption.outline);
      newOption.songId = this.game.songs[ii];
      newOption.songData = JSON.parse(this.game.cache.getText(newOption.songId));
      newOption.text = this.game.add.text(0,0, newOption.songData.name, { fill: '#FFF'});
      newOption.add(newOption.text);
      newOption.position.y = ii * 30;
      this.options.push(newOption);
    }

    this.select(this.getSelectedOption());
  },
  nextOption: function(){
    this.unselect(this.getSelectedOption());
    this.selectedOptionId += 1;
    if(this.selectedOptionId >= this.options.length){
      this.selectedOptionId = 0;
    }
    this.select(this.getSelectedOption());
  },
  previousOption: function(){
    this.unselect(this.getSelectedOption());
    this.selectedOptionId -= 1;
    if(this.selectedOptionId < 0){
      this.selectedOptionId = this.options.length - 1;
    }
    this.select(this.getSelectedOption());
  },
  getSelectedOption: function(){
    return this.options[this.selectedOptionId];
  },
  unselect: function(option){
    option.outline.visible = false;
  },
  select: function(option){
    option.outline.visible = true;
  },
  update: function(){
    this.game.keyManager.update();
    if(this.game.keyManager.isReleased('enter')){
      this.state.start('Level', true, false, this.getSelectedOption().songData);
    } else if(this.game.keyManager.isPressed('down')){
      this.nextOption();
    } else if(this.game.keyManager.isPressed('up')){
      this.previousOption();
    }
  }
}
