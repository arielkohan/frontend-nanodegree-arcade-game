// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = Math.floor(Math.random() * 3) * moveY + initialY + moveY ; 
    this.x = initialX - moveX;
    this.speed = Math.random() * 300; //decimal entre 0 y 1
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed ;

    //HANDLE COLLISION
    if(player && player.x == this.x && player.y == this.y){
        player.y = initialY + moveY * 5;
        console.log("crash!");
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    var sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    //this.sprite = sprites[ Math.floor(Math.random() * 5) ]; //random character
    this.sprite =  'images/char-boy.png';
    this.x = initialX + moveX * 2;
    this.y = initialY + moveY * 5;

};

Player.prototype.update = function(horizontal, vertical) {
    if(vertical){
        var nextYPosition = this.y + moveY * vertical ;
        if(nextYPosition >= initialY && nextYPosition <= (initialY + 4 * moveY))
                this.y = nextYPosition;
    }
    if(horizontal){
        var nextXPosition = this.x + moveX * horizontal ;
        if(nextXPosition >= initialX && nextXPosition <= (initialX + 4 * moveX))
                this.x = nextXPosition;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (input){
    switch( input ){
        case 'left': this.update(-1 , 0); break;
        case 'right': this.update(1, 0); break;
        case 'up': this.update(0, -1); break;
        case 'down': this.update(0, 1); break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var moveX = 101,
    moveY = 83,
    initialX = 0,
    initialY = -10;

var player = new Player();
var allEnemies = [];
for(var i = 0 ; i < 10 ; i++){
    allEnemies.push(new Enemy());
    console.log(allEnemies[allEnemies.length - 1].y);
}

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
