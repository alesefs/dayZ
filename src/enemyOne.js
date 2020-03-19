function EnemyOne(game){
    this.game = game;
    this.sprite = null;
}

EnemyOne.prototype.create = function () {
    this.life = 0;
    this.attackTime = 0;

    this.countEnemy = 0;
    this.enemyDelay = 3;
    this.sideEnemy = 0;
    
    this.enemyOne = this.game.add.sprite(this.game.world.width - 100, 200, 'rects');
    this.game.physics.enable(this.enemyOne);
    this.enemyOne.body.collideWorldBounds = true;
    this.enemyOne.body.outOfBoundsKill = true
    this.enemyOne.body.acceleration.y = 980;
    this.enemyOne.enableBody = true;
    this.enemyOne.anchor.setTo(0.5, 0.5);
    this.enemyOne.scale.setTo(0.5, 0.5);
    this.enemyOne.animations.add('walk', [0, 1, 2, 3], 10, true);
    this.enemyOne.animations.add('atk', [4, 5], 10, false);//atak meelee
    this.enemyOne.animations.add('idle', [6], 0, false);
    this.enemyOne.animations.add('dead', [7, 8], 10, false);
    this.enemyOne.animations.add('jump', [9, 10], 10, false);//atak shooter
    this.enemyOne.animations.play('idle');
    this.enemyOne.health = 5;
    
    //this.bar = this.game.add.graphics(0, 0);
    //this.bar.beginFill(0xFF3300);
    //this.bar.lineStyle(1, 0x000000, 1);
    //this.bar.drawRect(0, 0, 60, 5);

    this.bar = this.enemyOne.addChild(this.game.make.sprite(-75, -100, 'fullbar'));
    this.bar.width = 150;
    this.bar.anchor.setTo(0, 0.5);


    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.game.physics.enable(this.enemies);
    this.nextEnemyAt = 0;
    this.enemyDelay = 3;
    this.sideEnemy = 0; 

}

EnemyOne.prototype.update = function() {
    
    /*
    this.nextEnemyAt += this.game.time.elapsed/1000;
    if(this.nextEnemyAt > this.enemyDelay){
        this.nextEnemyAt = 0;
        this.enemyDelay = this.game.rnd.integerInRange(2, 5);
        this.sideEnemy = this.game.rnd.integerInRange(0, 2);
        for(x = 0; x < 5; x++){
            this.createEnemy();
        }
    }
    */

    if(main_state.getPlayer().x + 25 < this.enemyOne.body.x){
        this.enemyOne.body.velocity.x = -100;
        this.enemyOne.animations.play('walk');
    } else if (main_state.getPlayer().x - 25 > this.enemyOne.body.x + 75) {
        this.enemyOne.body.velocity.x = 100;
        this.enemyOne.animations.play('walk');
    } else if (main_state.getPlayer().x + 25 >= this.enemyOne.body.x && main_state.getPlayer().x - 25 <= this.enemyOne.body.x + 75 && main_state.getPlayer().y > this.enemyOne.body.y - 20) {
        this.enemyOne.body.velocity.x = 0;
        this.enemyOne.animations.play('atk');
    } else {
        this.enemyOne.body.velocity.x = 0;
        this.enemyOne.animations.play('idle');
    }

}

/*
EnemyOne.prototype.createEnemy = function(){
    //var enemy = this.enemyPool.create(200, 100, 'rects');

    this.enemyOne = this.game.add.sprite(this.game.world.width - 100, 200, 'rects');
    this.game.physics.enable(this.enemyOne);
    this.enemyOne.body.acceleration.y = 980;
    this.enemyOne.enableBody = true;
    this.enemyOne.body.collideWorldBounds = true;
    this.enemyOne.body.outOfBoundsKill = true
    this.enemyOne.anchor.setTo(0.5, 0.5);
    this.enemyOne.scale.setTo(0.5, 0.5);
    this.enemyOne.animations.add('walk', [0, 1, 2, 3], 10, true);
    this.enemyOne.animations.add('atk', [4, 5], 10, false);//atak meelee
    this.enemyOne.animations.add('idle', [6], 0, false);
    this.enemyOne.animations.add('dead', [7, 8], 10, false);
    this.enemyOne.animations.add('jump', [9, 10], 10, false);//atak shooter
    this.enemyOne.animations.play('idle');
    this.enemyOne.health = 5;
    
    this.bar = this.enemyOne.addChild(this.game.make.sprite(-75, -100, 'fullbar'));
    this.bar.width = 150;
    this.bar.anchor.setTo(0, 0.5);


    //this.enemies.addChild(this.enemyOne);
}
*/

EnemyOne.prototype.live = function(){
        this.life += 1;
        if(this.life == 1){
            this.enemyOne.health -= 1;
            
            this.bar.width -= 30;
            
            if(this.enemyOne.health <= 0){
                this.enemyOne.kill();
                this.enemyOne.health = 0;
                this.life = 0;
            }
        }
}

EnemyOne.prototype.startAttack = function(){
    this.attackTime += this.game.time.elapsed/1000;
}


EnemyOne.prototype.getEnemyOne = function() {
    return this.enemyOne;
}

