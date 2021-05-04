/* globals Phaser */
const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			// gravity: { y: 300 },
			debug: false,
		},
	},
	scene: {
		preload,
		create,
		update,
	},
};

const game = new Phaser.Game(config);

let ball;
let paddle;
let cursor;

let velocityX = Phaser.Math.Between(-100, 100);
let velocityY = 100;

function preload() {
	this.load.image('sky', 'assets/sky.png');
	this.load.image('paddle', 'assets/platform.png');
	this.load.image('ball', 'assets/bomb.png');
}

function create() {
	this.add.image(400, 300, 'sky');
	ball = this.physics.add.sprite(50, 50, 'ball');
	paddle = this.physics.add.sprite(game.config.width / 2, game.config.height * .95, 'paddle').setScale(.5);
	paddle.setCollideWorldBounds(true);
	cursor = this.input.keyboard.createCursorKeys();

	ball.setVelocity(velocityX, velocityY);
	ball.setBounce(1);
	ball.setCollideWorldBounds(true);

	this.physics.add.collider(ball, paddle, hitPaddle, null, this);
}

function update() {
	if (cursor.left.isDown) {
		paddle.setVelocityX(-160);
	} else if (cursor.right.isDown) {
		paddle.setVelocityX(160);
	} else {
		paddle.setVelocityX(0);
	}
}

function hitPaddle(_ball, _player) {
	velocityY = (velocityY + 50) * -1;
	if (velocityX < 0) {
		velocityX = velocityX * -1;
	}
	_ball.setVelocity(velocityX, velocityY);
	_player.setVelocityY(0);
	_player.setVelocityX(0);
}
