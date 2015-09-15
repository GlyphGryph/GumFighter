NSTC.KeyManager = function(game){
  this.game = game;
  // Key states: 0/Free, 1/Pressed, 2/Held, 3/Released
  this.keys = [
    { name: "enter", code: 13},
    { name: "left", code: 37},
    { name: "up", code: 38},
    { name: "right", code: 39},
    { name: "down", code: 40},
    { name: "a", code: 65},
    { name: "w", code: 87},
    { name: "s", code: 83},
    { name: "d", code: 68},
  ];
  this.keysByName = {};
  this.keysByCode = {};
  for(var ii=0; ii < this.keys.length; ii+=1){
    this.keys[ii].state = 0;
    this.keys[ii].timeChanged = 0;
    this.keysByName[this.keys[ii].name] = this.keys[ii];
    this.keysByCode[this.keys[ii].code] = this.keys[ii];
  }
};
NSTC.KeyManager.prototype = {
  update: function(){
    for(var ii=0; ii < this.keys.length; ii+=1){
      var key = this.keys[ii];
      var newState = -1;
      if( (key.state == 0 || key.state == 3) && this.game.input.keyboard.isDown(key.code)){
        newState = 1;
      } else if(key.state == 1 && this.game.input.keyboard.isDown(key.code)){
        newState = 2;
      } else if( (key.state == 2 || key.state == 1) && !this.game.input.keyboard.isDown(key.code)){
        newState = 3;
      } else if(key.state == 3 && !this.game.input.keyboard.isDown(key.code)){
        newState = 0;
      }
      if(newState >= 0){
        key.state = newState;
        key.timeChanged = this.game.time.now
      }
    }
  },
  getKey: function(code){
    var key = this.keysByCode[code]
    if(key){
      return key;
    } else {
      return this.keysByName[code];
    }
  },
  // Returns true if free or released
  isFree: function(code){
    var key = this.getKey(code);
    return key.state == 0 || key.state == 3;
  },
  isPressed: function(code){
    return this.getKey(code).state == 1;
  },
  // Returns true if in held or pressed state
  isHeld: function(code){
    var key = this.getKey(code);
    return key.state == 2 || key.state == 1;
  },
  isReleased: function(code){
    return this.getKey(code).state == 3;
  },
  timeHeld: function(code){
    return this.game.time.now - this.getKey(code).timeChanged;
  },
  resetTime: function(code){
    this.keysByCode[code].timeChanged = this.game.time.now;
  },
  alertCodeForPressed: function(){
    for(var ii=0; ii < 255; ii += 1){
      if(this.game.input.keyboard.isDown(ii)){
        alert("Pressed: "+ii);
      }
    }
  }
}
