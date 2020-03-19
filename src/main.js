var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, "game");


var bg = new Background(game);
var enemies = new Enemies(game);
var control = new Control(game);
var player = new Player(game);

var main_state = {

    preload: function () {
        this.load.image('fullbar', 'img/full.png');
        this.load.image('nullbar', 'img/null.png');
        this.load.image('nillbar', 'img/nill.png');
        this.load.spritesheet('grass', 'img/grass.png', 300, 100);
        this.load.spritesheet('btns', 'img/btns.png', 150, 150, 9);
        this.load.spritesheet('rects', 'img/rects.png', 150, 150, 22);
    },

    create: function () {
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	this.game.world.setBounds(0, 0, 1500, this.game.height);

        bg.create();
        enemies.create();
        control.create();

    },

    update: function (){
        
        this.physics.arcade.collide(bg.floor, player.getPlayer(), this.playerFloor, null, this);
        
        this.physics.arcade.collide(bg.floor, enemies.getEnemyPool('basic'));
        this.physics.arcade.overlap(player.getPlayer(), enemies.getEnemyPool('basic') /*basicEnemy.getEnemyPool()*/, this.enemyHit, null, this);

        player.update();
        enemies.update();
        
    },

    playerFloor: function(player, floor){
        player.step = true;
    },

    enemyHit: function(hero, enemy) {

            basicEnemy.startAttack();
            if(Math.round(basicEnemy.attackTime) % 2 == 0 && Math.round(basicEnemy.attackTime) > 0){
                player.live();
            } else {
                player.resguard();
            }

            
            if(player.attack){
                enemy.life += 1;

                if(enemy.life == 1){
                    enemy.health -= 1;

                    enemy.healthbar.width = enemy.health * 30;
                        
                    if(enemy.health <= 0){
                        enemy.kill(); 
                    }
                }               
            } else {
                enemy.life = 0;
            }
    },


    getPlayer: function(){ 
        return player.getPlayer();
    },

    render: function(){
        //this.game.debug.text("cte: " + cte, 50, 100, "chartreuse");
    }

}; 


this.game.state.add('main', main_state);  
this.game.state.start('main');



