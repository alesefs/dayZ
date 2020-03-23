FDZ.Preloader = function(game) {};
FDZ.Preloader.prototype = {
	preload: function() {

		//loading
		this.preloadBg = this.add.sprite((this.game.world.centerX), (this.game.world.centerY), 'preloaderBg');
		this.preloadBg.anchor.setTo(0.5, 0.5);
		this.preloadBar = this.add.sprite((this.game.world.centerX), (this.game.world.centerY), 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.game.load.setPreloadSprite(this.preloadBar);

		this.game.load.image('floor', 'assets/imgs/floor.png');
		this.game.load.image('shovel', 'assets/imgs/pa.png');
		this.game.load.spritesheet('btns', 'assets/imgs/btns.png', 150, 150, 9);
		
		this.game.load.spritesheet('enemy', 'assets/imgs/enemytest.png', 60, 130);

		this.game.load.spritesheet('hero_', 'assets/imgs/hero-farm.png', 60, 130);
	},

	create: function() {
		this.game.state.start('PlayState');
	}
};