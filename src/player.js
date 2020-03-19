var attack;
var onTheGround;

function Player(game){
    this.game = game;
    this.sprite = null;
}

Player.prototype.create = function () {
    this.life = 0;
    this.hurt = 10;
    this.countjump = 0;
    //this.counthurt = 0;

    this.player = this.game.add.sprite(this.game.world.width/2, 200, 'rects');
    this.game.physics.enable(this.player);
    this.player.body.acceleration.y = 980;
    this.player.enableBody = true;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(0.5, 0.5);
    this.player.step = false;
    this.player.animations.add('walk', [11, 12, 13, 14], 10, true);
    this.player.animations.add('atk', [15, 15], 10, false);
    this.player.animations.add('idle', [17], 0, false);
    this.player.animations.add('dead', [18, 19], 10, false);
    this.player.animations.add('jump', [20, 21], 10, false);
    this.player.animations.play('idle');
    this.game.camera.follow(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.health = 10;

    this.onTheGround = this.player.body.touching.down;

    this.attack = false;
/*
    this.bar = player.addChild(this.game.add.graphics(0, 0));
    //this.bar = this.game.add.graphics(0, 0)
    this.bar.beginFill(0x0033FF);
    this.bar.lineStyle(1, 0x000000, 1);
    this.bar.drawRect(0, 0, 100, 5);
*/

    this.bar = this.game.make.sprite(-75, -100, 'nillbar');
    this.bar.width = 150;//enemy.health * 30;
    this.bar.anchor.setTo(0, 0.5);
    this.player.addChild(this.bar);




    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.exKey = game.input.keyboard.addKey(Phaser.Keyboard.X);

}

Player.prototype.update = function() {
    
    this.player.body.velocity.x = 0;
    this.player.angle = 0;
    this.attack = false;

    if (this.upKey.isDown && this.player.step){//this.player.body.touching.down){
        this.player.body.velocity.y = -this.player.body.acceleration.y / 2;
        this.player.animations.play('jump');
        this.player.step = false;

    } else if (this.leftKey.isDown){
        this.player.body.velocity.x = -200;
        this.player.animations.play('walk');

    } else if (this.rightKey.isDown){
        this.player.body.velocity.x = 200;
        this.player.animations.play('walk');

    } else if (this.exKey.isDown){
        this.player.angle = -45;
        this.player.animations.play('atk');
        this.attack = true;

    } else if (this.player.body.touching.down){
        this.player.animations.play('idle');
    }


}

Player.prototype.left = function(){
    this.player.body.velocity.x = -200;
    this.player.animations.play('walk');
}
Player.prototype.right = function(){
    this.player.body.velocity.x = 200;
    this.player.animations.play('walk');
}
Player.prototype.stop = function(){
    this.player.body.velocity.x = 0;
    this.player.animations.play('idle');
}
Player.prototype.jump = function(){
    if(this.player.step){//if(this.player.body.touching.down == true){
        this.player.body.velocity.y = -this.player.body.acceleration.y / 2.5;
        this.player.animations.play('jump');
        this.player.step = false;
    }
}
Player.prototype.atak = function(){
    this.player.animations.play('atk');
    this.attack = true;
}

Player.prototype.fall = function(){
    this.player.animations.play('idle');
    this.attack = false;
}

Player.prototype.live = function(){
    this.life += 1
    if(this.life == 1){
        this.player.health -= 1;

        this.bar.width -= 15;
        
        if(this.player.health <= 0){
            this.player.kill();
            this.life = 0;
        }
    }
}

Player.prototype.resguard = function(){
    this.life = 0;
}




Player.prototype.getPlayer = function() {
    return this.player;
}

