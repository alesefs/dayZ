var FDZ = {/*global vars*/};

FDZ.Boot = function(game) {};
FDZ.Boot.prototype = {

	init: function () {
			this.input.maxPointers = 2;
			this.stage.disableVisibilityChange = false;

			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.time.advancedTiming = true;

    },

	preload: function() {
		this.load.image('preloaderBg', 'assets/imgs/null.png');
		this.load.image('preloaderBar', 'assets/imgs/full.png');
	},


	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('Preloader');
	}

};