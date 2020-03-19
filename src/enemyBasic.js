//var bar;
//var t;
var style;
var child;

//var bar;
//var enemy;

function EnemyBasic(game){
    this.game = game;
}

EnemyBasic.prototype.create = function() {
    //this.life = 0;
    this.hurt = 5;
    this.counthurt = 0;
    this.attackTime = 0;
    this.enemyName = 0;

    this.enemyPool = this.game.add.group();
    this.enemyPool.enableBody = true;
    this.game.physics.enable(this.enemyPool);
    this.nextEnemyAt = 0;
    this.enemyDelay = 3;
    this.sideEnemy = 0; 

    this.barPool = this.game.add.group();
    this.barPool.enableBody = true;
    this.game.physics.enable(this.barPool);

   /* child = this.game.add.group();
    child.enableBody = true;
    this.game.physics.enable(child);*/

    //style = { font: "25px Arial", fill: "#ff0044", align: "center" };
}

EnemyBasic.prototype.update = function() {
    this.nextEnemyAt += this.game.time.elapsed/1000;
    if(this.nextEnemyAt > this.enemyDelay){
        this.nextEnemyAt = 0;
        this.enemyDelay = this.game.rnd.integerInRange(2, 5);
        this.sideEnemy = this.game.rnd.integerInRange(0, 2);
        this.createEnemy();
    }



    this.enemyPool.forEach(function(bb1){
    
        if(main_state.getPlayer().x + 25 < bb1.body.x){
            bb1.body.velocity.x = -100;
        } else if (main_state.getPlayer().x - 25 > bb1.body.x + 75) {
            bb1.body.velocity.x = 100;
        } else if (main_state.getPlayer().x + 25 >= bb1.body.x && main_state.getPlayer().x - 25 <= bb1.body.x + 75 && main_state.getPlayer().y > bb1.body.y - 20) {
            bb1.body.velocity.x = 0;
        } else {
            bb1.body.velocity.x = 0;
        }

    },this);

    

}

EnemyBasic.prototype.createEnemy = function(){

    this.bar = this.game.add.sprite(-75, -100, 'fullbar');
    this.game.physics.enable(this.bar, Phaser.Physics.ARCADE);
    this.bar.scale.setTo(0.5, 0.5);
    this.bar.anchor.setTo(0, 0.5);
    this.bar.width = 150;
    this.bar.contador = this.enemyName;   
    this.barPool.add(this.bar);
    

    switch(this.sideEnemy){
        case 0:
            this.enemy = this.game.add.sprite(200, this.game.height - 150, 'rects');
            break;
        case 1:
            this.enemy = this.game.add.sprite(700, this.game.height - 150, 'rects');
            break;
        case 2:
            this.enemy = this.game.add.sprite(1100, this.game.height - 150, 'rects');
            break;
        default:
            break;
    }

    this.enemyName += 1;
    this.enemy.name = 'enemy' + this.enemyName;

    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
    this.enemy.body.acceleration.y = 980;
    this.enemy.anchor.setTo(0.5, 0.5);
    this.enemy.scale.setTo(0.5, 0.5);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.body.outOfBoundsKill = true;
    this.enemy.health = 5;
    this.enemy.life = 0;

    this.enemy.healthbar = this.bar;
    
    this.enemy.contador = this.enemyName;
    this.enemy.animations.add('walk', [0, 1, 2, 3], 10, true);
    this.enemy.animations.add('atk', [4, 5], 10, false);//atak meelee
    this.enemy.animations.add('idle', [6], 0, false);
    this.enemy.animations.add('dead', [7, 8], 10, false);
    this.enemy.animations.add('jump', [9, 10], 10, false);//atak shooter
    this.enemy.animations.play('idle');
    this.enemyPool.add(this.enemy);

    this.enemy.addChild(this.bar);
    
}


EnemyBasic.prototype.startAttack = function(){
    this.attackTime += this.game.time.elapsed/1000;
}

EnemyBasic.prototype.getEnemyPool = function() {
    return this.enemyPool;   
}

