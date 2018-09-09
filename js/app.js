// var score = 0; 
// var lives = 3; 
// var level = 0; 

// 这是我们的玩家要躲避的敌人
var Enemy = function(row, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = -100;
    this.y = (row - 1) * 80 + 65;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
	this.x = this.x + this.speed * dt;
    if (this.x > ctx.canvas.width) {
        this.x = -100
    };
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
const playerInitX = 200, palyerInitY = 380;
var Player = function() {
    var chars = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-pink-girl.png'];
    this.sprite = chars[Math.floor(Math.random() * 3)];
    this.x = playerInitX;
    this.y = palyerInitY;
    this.speed = 10;
};

Player.prototype.update = function(dt) {
	this.checkCollisions();
    this.x = playerInitX;
    this.y = palyerInitY;
    allEnemies = [];
    generateEnemies();
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function() {
    var len=allEnemies.length;
    for (var i = 0; i < len;  i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            console.log('hit');
            this.lives();
            this.reset();
        };
    };          
}

Player.prototype.handleInput = function(key) {
    const MOVE_WIDTH = 100;
    const MOVE_HEIGHT = 82;
    if (key === 'left' && this.x > 0) {
            this.x = this.x - MOVE_WIDTH;
        } else if (key === 'right' && this.x < 400) {
            this.x = this.x + MOVE_WIDTH;
        } else if (key === 'up' && this.y > 0) {
            this.y = this.y - MOVE_HEIGHT;
        } else if (key === 'down' && this.y < 380) {
            this.y = this.y + MOVE_HEIGHT;
        }
};

Player.prototype.reset = function() {
    this.x = playerInitX;
    this.y = palyerInitY;
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
function generateEnemies () {
    for (var i = 0; i < 5; i++) {
        var row = Math.floor(Math.random() * (4 - 1)) + 1;
        var speed = Math.floor(Math.random() * 50) * 10;
        allEnemies[i] = new Enemy(row, speed);
    }
};
generateEnemies();
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});