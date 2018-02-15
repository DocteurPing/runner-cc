var StateMain = {
	preload: function() {
		game.load.image("ground", "images/ground.png");
		game.load.image("hero", "images/hero.png");
		game.load.image("bar", "images/powerbar.png");
		game.load.image("block", "images/block.png");
	},
	create: function() {
		this.power = 0;
		game.stage.backgroundColor = "#00ffff";
		this.ground = game.add.sprite(game.width * .2, game.height * .9, "ground");
		this.hero = game.add.sprite(game.width * .2, this.ground.y - 100, "hero");
		this.powerBar = game.add.sprite(this.hero.x + 25, this.hero.y - 25, "bar");
		this.powerBar.width = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.enable(this.hero, Phaser.Physics.ARCADE);
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.hero.body.gravity.y = 200;
		//this.hero.body.collideWorldBounds = true;
		this.ground.body.immovable = true;
		game.input.onUp.add(this.mouseUp, this);
		game.input.onDown.add(this.mouseDown, this);
	},
	mouseDown: function() {
		this.timer = game.time.events.loop(Phaser.Timer.SECOND / 1000, this.increasePower, this);
	},
	mouseUp: function() {
		this.doJump();
		game.time.events.remove(this.timer);
		this.power = 0;
		this.powerBar.width = 0;
	},
	increasePower: function() {
		this.power++;
		this.powerBar.width = this.power;
		if (this.power > 50) {
			this.power = 50;
		}
	},
	doJump: function() {
		this.hero.body.velocity.y = -this.power * 12;
		this.hero.body.velocity.x = 10;
	},
	update: function() {
		game.physics.arcade.collide(this.hero, this.ground, this.stopPlayer, null, this);
	},
	stopPlayer: function() {
		this.hero.body.velocity.x = 0;
	}
}

var game = new Phaser.Game(1000, 500);
game.state.add('main', StateMain);
game.state.start('main');