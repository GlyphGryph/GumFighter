NSTC.KeyManager = function(game){
  this.game = game;
  // Key states: 0/Free, 1/Pressed, 2/Held, 3/Released
  this.keys = [
    { name: "backspace", code: 8},
    { name: "tab", code: 9},
    { name: "enter", code: 13},
    { name: "shift", code: 16},
    { name: "ctrl", code: 17},
    { name: "alt", code: 18},
    { name: "pause/break", code: 19},
    { name: "caps lock", code: 20},
    { name: "escape", code: 27},
    { name: "page up", code: 33},
    { name: "page down", code: 34},
    { name: "end", code: 35},
    { name: "home", code: 36},
    { name: "left", code: 37},
    { name: "up", code: 38},
    { name: "right", code: 39},
    { name: "down", code: 40},
    { name: "insert", code: 45},
    { name: "delete", code: 46},
    { name: "0", code: 48},
    { name: "1", code: 49},
    { name: "2", code: 50},
    { name: "3", code: 51},
    { name: "4", code: 52},
    { name: "5", code: 53},
    { name: "6", code: 54},
    { name: "7", code: 55},
    { name: "8", code: 56},
    { name: "9", code: 57},
    { name: "a", code: 65},
    { name: "b", code: 66},
    { name: "c", code: 67},
    { name: "d", code: 68},
    { name: "e", code: 69},
    { name: "f", code: 70},
    { name: "g", code: 71},
    { name: "h", code: 72},
    { name: "i", code: 73},
    { name: "j", code: 74},
    { name: "k", code: 75},
    { name: "l", code: 76},
    { name: "m", code: 77},
    { name: "n", code: 78},
    { name: "o", code: 79},
    { name: "p", code: 80},
    { name: "q", code: 81},
    { name: "r", code: 82},
    { name: "s", code: 83},
    { name: "t", code: 84},
    { name: "u", code: 85},
    { name: "v", code: 86},
    { name: "w", code: 87},
    { name: "x", code: 88},
    { name: "y", code: 89},
    { name: "z", code: 90},
    { name: "left window key", code: 91},
    { name: "right window key", code: 92},
    { name: "select key", code: 93},
    { name: "numpad 0", code: 96},
    { name: "numpad 1", code: 97},
    { name: "numpad 2", code: 98},
    { name: "numpad 3", code: 99},
    { name: "numpad 4", code: 100},
    { name: "numpad 5", code: 101},
    { name: "numpad 6", code: 102},
    { name: "numpad 7", code: 103},
    { name: "numpad 8", code: 104},
    { name: "numpad 9", code: 105},
    { name: "multiply", code: 106},
    { name: "add", code: 107},
    { name: "subtract", code: 109},
    { name: "decimal point", code: 110},
    { name: "divide", code: 111},
    { name: "f1", code: 112},
    { name: "f2", code: 113},
    { name: "f3", code: 114},
    { name: "f4", code: 115},
    { name: "f5", code: 116},
    { name: "f6", code: 117},
    { name: "f7", code: 118},
    { name: "f8", code: 119},
    { name: "f9", code: 120},
    { name: "f10", code: 121},
    { name: "f11", code: 122},
    { name: "f12", code: 123},
    { name: "num lock", code: 144},
    { name: "scroll lock", code: 145},
    { name: ";", code: 186},
    { name: "=", code: 187},
    { name: ",", code: 188},
    { name: "-", code: 189},
    { name: ".", code: 190},
    { name: "/", code: 191},
    { name: "`", code: 192},
    { name: "[", code: 219},
    { name: "backslash", code: 220},
    { name: "]", code: 221},
    { name: "'", code: 222},
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
