var enemyPosY = [60, 143, 226];
var enemySpeed = [100, 130, 160, 200, 250, 300, 400];
var gemPosX = [0, 101, 202, 303, 404, 505, 606, 707, 808];
var gemImages = ['images/Gem-Orange.png', 'images/Gem-Blue.png', 'images/Gem-Green.png'];
var playerImages = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];
var allowedTime = 1800000;

/**
 * ENEMY our player must avoid.
 */
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
  this.speed = enemySpeed[Math.floor(Math.random() * 7)];
};
/** 
 * Updates the enemy's position.
 * And resets player when collision occurs.
 * @param dt A time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  if (this.x > 960) {
    this.x = -100;
    this.y = this.y + 83;
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
    if (this.y > 226) {
      this.y = 60;
    }
  }

  if (this.x > -50 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 101;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 202;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 303;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 404;
  } else if (this.x > 450 && this.x < 550) {
    this.tileX = 505;
  } else if (this.x > 550 && this.x < 650) {
    this.tileX = 606;
  } else if (this.x > 650 && this.x < 750) {
    this.tileX = 707;
  } else if (this.x > 750 && this.x < 850) {
    this.tileX = 808;
  } else if (this.x > 850) {
    this.tileX = 1;
  }

  if (player.x === this.tileX && player.y === this.y) {
    player.reset();
    gameLife.decrease();
  }
};
/**
 * Renders enemy on the screen.
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * Player class
 */
var Player = function() {
  this.pImg = playerImages[Math.floor(Math.random() * 5)];
  this.x = 404;
  this.y = 392;
};
/** 
 * Updates the player's position.
 * The player's position is updated by the direction of ctlKey value.
 * The player's position resets when reach the water.
 */
Player.prototype.update = function() {
  if (this.ctlKey === 'left' && this.x !== 0) {
    this.x = this.x - 101;
  } else if (this.ctlKey === 'right' && this.x != 808) {
    this.x = this.x + 101;
  } else if (this.ctlKey === 'up') {
    this.y = this.y - 83;
  } else if (this.ctlKey === 'down' && this.y != 392) {
    this.y = this.y + 83;
  }
  this.ctlKey = null;

  if (this.y < 60) {
    this.reset();
    gameLife.decrease();
  }
};
/**
 * Move the player to initial position.
 */
Player.prototype.reset = function() {
  this.x = 404;
  this.y = 392;
};
/**
 * Renders the player on the screen.
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.pImg), this.x, this.y);
};
/**
 * Sets control key for updating player's postion.
 * @param key Direction passed in from user's key input.
 */
Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
};


/**
* GEM: player should try to collect gems in the allotted time.
 * Time is changeable (allowedTime in ms)
 * Gems appear randomly, and for every gem the player collects, 1 enemy is created.
 */
var Gem = function() {
  this.gemImg = gemImages[Math.floor(Math.random() * 3)];
  this.x = gemPosX[Math.floor(Math.random() * 9)];
  this.y = enemyPosY[Math.floor(Math.random() * 3)];
  this.count = 0;
};
/** 
 * Updates gem's position.
 * Gem's position will reset whenever player touches it.
 */
Gem.prototype.update = function() {
  if (player.x === this.x && player.y === this.y) {
    this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 9)];
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    if (allEnemies.length < 20) {
      allEnemies.push(new Enemy());
    }
    gameScore.score++;
    gem.count++;
    if (gameScore.score > 5) {
      //console.log("calling score.decrease:"+gameScore.score+" and "+gameLife.life);
      gameScore.decrease(5);
    }
  }
};
/**
 * Renders the gem on the screen.
 */
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};


/**
 * SCORE shows number of gems player has collected. But these get adjusted for lives.
 * 5 gems=1 life
 */
var Score = function() {
  this.scoreImg = 'images/Gem-Purple.jpg';
  this.score = 0;
};

/**
 * Decrease score by 5 and add a life.
 */
Score.prototype.decrease = function(n) {
  if (this.score > n) {
    this.score = this.score - n;
    gameLife.life++;
    //console.log("After Score.dcrease: "+ this.score+" and life =" +gameLife.life+ "and gem count="+gem.count);
  }
};

/**
 * Renders Score on the screen.
 */
Score.prototype.render = function() {
  var x = 0;
  //console.log("current score is " + this.score);
  for (var i = 0; i < this.score; i++) {
      ctx.drawImage(Resources.get(this.scoreImg), x, 10);
      x = x + 50;
  } 
};
/**
 * LIFE of the player.
 */
var Life = function() {
  this.lifeImg = 'images/Heart-small.png';
  this.life = 5;
};
/**
 * Renders life on the screen.
 */
Life.prototype.render = function() {
  var x = 0;
  for (var i = 0; i < this.life; i++) {
    ctx.drawImage(Resources.get(this.lifeImg), x, 590);
    x = x + 50;
  }
  
  // Game ends in allowedTime/60000 minutes or when life=0
  // To increase playtime value, change allowedTime value in line 12
  if (this.life === 0 && msPlayedTime < allowedTime) {
    ctx.drawImage(Resources.get('images/gameover.png'), 0, 15);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("You collected "+gem.count+" gems; but no lives left!",200,420);
    ctx.fillText("Reload page to play again.",200,480);
    ctx.drawImage(Resources.get('images/background.png'), 0, 590);
  } else if (msPlayedTime >= allowedTime) {
    ctx.drawImage(Resources.get('images/gameover.png'), 0, 15);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("You collected "+gem.count+" gems in "+allowedTime/60000.0+" minute(s)",200,420);
    ctx.fillText("Reload page to play again.",200,480);
    ctx.drawImage(Resources.get('images/background.png'), 0, 590);
  }
};
/**
 * Decrease number of lives.
 */
Life.prototype.decrease = function() {
  if (this.life > 0) {
    this.life = this.life - 1;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

var player = new Player();
var gem = new Gem();
var gameScore = new Score();
var gameLife = new Life();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }  
}, false);
