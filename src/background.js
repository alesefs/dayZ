/*var player;
*/
function Background(game){
    this.game = game;
    this.sprite = null;
}

Background.prototype.create = function () {
    
    this.game.stage.backgroundColor = "#3e4f7c";

	this.floor = this.game.add.group();
	this.game.physics.enable(this.floor);
	this.floor.enableBody = true;
	for (var i = 0; i < 5; i++){
		this.blocked = this.floor.create(0 + (i*300), this.game.height, 'grass');
		this.game.physics.enable(this.blocked, Phaser.Physics.ARCADE);
		this.blocked.body.enable = true;
		this.blocked.body.immovable = true;
		this.blocked.anchor.setTo(0, 1);
		this.blocked.animations.add('grass', [0, 1], 5, true);
		this.blocked.animations.play('grass');
	}

}


Background.prototype.getBackground = function() {
    return this.bg;
}

