var player;

function Control(game){
    this.game = game;
    this.sprite = null;
}

Control.prototype.create = function () {
    player = new Player(this.game);
    player.create();


    this.btnLayer = this.game.add.group();

	this.btnLeft = this.btnLayer.create(40, this.game.height - 40, 'btns', 1);
	//this.btnLeft = this.game.add.sprite(40, this.game.height - 40, 'btns', 1);
    this.btnLeft.anchor.setTo(.5, .5);
    this.btnLeft.scale.setTo(.4, .4);
    this.btnLeft.fixedToCamera = true;
    this.btnLeft.inputEnabled = true;
    this.btnLeft.events.onInputDown.add(this.left, this);
	this.btnLeft.events.onInputUp.add(this.stop, this);

    this.btnRight = this.btnLayer.create(120, this.game.height - 40, 'btns', 0);
	//this.btnRight = this.game.add.sprite(120, this.game.height - 40, 'btns', 0);
    this.btnRight.anchor.setTo(.5, .5);
    this.btnRight.scale.setTo(.4, .4);
    this.btnRight.fixedToCamera = true;
    this.btnRight.inputEnabled = true;
    this.btnRight.events.onInputDown.add(this.right, this);
	this.btnRight.events.onInputUp.add(this.stop, this);

    this.btnJump = this.btnLayer.create(this.game.width - 120, this.game.height - 40, 'btns', 3);
    //this.btnJump = this.game.add.sprite(this.game.width - 120, this.game.height - 40, 'btns', 3);
    this.btnJump.anchor.setTo(.5, .5);
    this.btnJump.scale.setTo(.4, .4);
    this.btnJump.fixedToCamera = true;
    this.btnJump.inputEnabled = true;
    this.btnJump.events.onInputDown.add(this.jump, this);
    this.btnJump.events.onInputUp.add(this.fall, this);

    this.btnAttack = this.btnLayer.create(this.game.width - 60, this.game.height - 100, 'btns', 6);
    //this.btnAttack = this.game.add.sprite(this.game.width - 60, this.game.height - 100, 'btns', 6);
    this.btnAttack.anchor.setTo(.5, .5);
    this.btnAttack.scale.setTo(.4, .4);
    this.btnAttack.fixedToCamera = true;
    this.btnAttack.inputEnabled = true;
    this.btnAttack.events.onInputDown.add(this.atak, this);
    this.btnAttack.events.onInputUp.add(this.fall, this);

    
}

Control.prototype.update = function() {}

Control.prototype.left = function(){ player.left(); }
Control.prototype.right = function(){ player.right(); }
Control.prototype.stop = function(){ player.stop(); }
Control.prototype.jump = function(){ player.jump(); }
Control.prototype.atak = function(){ player.atak(); /*main_state.getEnemyOne().hurt();*/}
Control.prototype.fall = function(){ player.fall(); }

Control.prototype.getControl = function() { return this.control; }

