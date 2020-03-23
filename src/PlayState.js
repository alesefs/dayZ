FDZ.PlayState = function(game) {
	var sky, nite, floor, hero, shovel, farmer, width, height = null;
	var walk, Twalk, jump, collide, punch, Tpunch, leftSide, btnRight, btnLeft, btnJump, btnDuck, btnBomb, btnAttack, cursors, jumpButton, atkButton = null;
	var countYfloor, countXchart, countYchart;
	var enemies, enemiesBar, /*enemy,*/ countEnemy, numberEnemies, enemySpawn, sideEnemy, enemyHurt = null;
};

FDZ.PlayState.prototype = {
	create: function() {
		this.game.stage.backgroundColor = "#687c69";
		cursors = this.game.input.keyboard.createCursorKeys();
		jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		atkButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);

		width = this.game.width;
		height = this.game.height;

		this.game.world.setBounds(0, 0, 1500, this.game.height);

		walk = false;
		leftSide = false;
		jump = false;
		collide = true;
		punch = false;
		Twalk = 0;
		Tpunch = 20;

		countEnemy = 0;
		enemySpawn = 3;
		sideEnemy = 0;
		numberEnemies = 0;

		floor = this.game.add.group();
		floor.enableBody = true;
		this.game.physics.enable(floor);
		for (var i = 0; i < 30; i++){
			var blocked = floor.create(0 + (i*50), height, 'floor');
			this.game.physics.enable(blocked, Phaser.Physics.ARCADE);
			blocked.body.enable = true;
			blocked.body.immovable = true;
			blocked.anchor.setTo(0, 1);
			if(height  >= 600){
			    blocked.scale.setTo(1, 1.25);
			} else {
			    blocked.scale.setTo(1, 0.75);
			}
		}



		hero = this.game.add.sprite(this.game.world.width/2, 200, 'hero_');
		this.game.physics.enable(hero);
		hero.enableBody = true;
	    hero.body.acceleration.y = 980;
		hero.anchor.setTo(0.5,0.5);
		if(height  >= 600){
		    hero.scale.setTo(1, 1);
        } else {
            hero.scale.setTo(.8, .8);
        }
		hero.animations.add('idle', [0], 0, true);
		hero.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		hero.animations.add('punch', [9, 10, 11, 12, 11, 10, 9, 0], 10, false);
		hero.animations.add('jump', [1, 8, 13, 8], 2, false);
		this.game.camera.follow(hero);
		hero.body.collideWorldBounds = true;

		shovel = this.game.add.sprite(hero.x, hero.y - 40, 'shovel');
		shovel.enableBody = true;
		this.game.physics.enable(shovel);



		/*
		enemy = this.game.add.sprite(600, 100, 'enemy');
		this.game.physics.enable(enemy);
		enemy.enableBody = true;
	    //enemy.body.gravity.y = 400;
	    enemy.body.acceleration.y = 980;
		enemy.anchor.setTo(0.5,0.5);
		if(height  >= 600){
		    enemy.scale.setTo(1, 1);
        } else {
            enemy.scale.setTo(.8, .8);
        }
		enemy.animations.add('idle', [0], 0, true);
		enemy.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		enemy.animations.add('jump', [1, 9], 2, false);
		*/

        enemies = this.game.add.group();
        enemies.enableBody = true;
        this.game.physics.enable(enemies);

        enemiesBar = this.game.add.group();
        enemiesBar.enableBody = true;
        this.game.physics.enable(enemiesBar);


	    btnLeft = this.game.add.sprite(40, height - 40, 'btns', 1);
	    btnLeft.anchor.setTo(.5, .5);
	    btnLeft.scale.setTo(.4, .4);
	    btnLeft.fixedToCamera = true;
	    btnLeft.inputEnabled = true;
	    btnLeft.events.onInputDown.add(this.lefter, this);
		btnLeft.events.onInputUp.add(this.stoper, this);

	    btnRight = this.game.add.sprite(120, height - 40, 'btns', 0);
	    btnRight.anchor.setTo(.5, .5);
	    btnRight.scale.setTo(.4, .4);
	    btnRight.fixedToCamera = true;
	    btnRight.inputEnabled = true;
	    btnRight.events.onInputDown.add(this.righter, this);
	    btnRight.events.onInputUp.add(this.stoper, this);

	    btnJump = this.game.add.sprite(width - 100, height - 40, 'btns', 3);
	    btnJump.anchor.setTo(.5, .5);
	    btnJump.scale.setTo(.4, .4);
	    btnJump.fixedToCamera = true;
	    btnJump.inputEnabled = true;
	    btnJump.events.onInputDown.add(this.jumper, this);
	    btnJump.events.onInputUp.add(this.floorer, this);

	    btnAttack = this.game.add.sprite(width - 50, height - 100, 'btns', 6);
        btnAttack.anchor.setTo(.5, .5);
        btnAttack.scale.setTo(.4, .4);
        btnAttack.fixedToCamera = true;
        btnAttack.inputEnabled = true;
        btnAttack.events.onInputDown.add(this.attack, this);
        btnAttack.events.onInputUp.add(this.endattack, this);
    },

   	update: function(){

		this.game.physics.arcade.collide(hero, floor, this.touchdown, null, this);

        this.game.physics.arcade.collide(enemies, floor);
        this.game.physics.arcade.collide(enemies);
		this.game.physics.arcade.overlap(shovel, enemies, this.challenger, null, this);


        if(jump && collide){
            hero.body.velocity.y = -hero.body.acceleration.y / 3;
            collide = false;
        }



        if(!walk){
            Twalk = 0;
        } else {
            Twalk ++;
            if(Twalk > 5){Twalk = 5;}
        }

        if(leftSide && walk && Twalk >= 5){
            hero.body.velocity.x = -150;
            hero.scale.x = -1;
        } else if (!leftSide && walk && Twalk >= 5){
            hero.body.velocity.x = 150;
            hero.scale.x = 1;
        } else {
            hero.body.velocity.x = 0;
        }

        Tpunch ++;
        if(Tpunch > 20){Tpunch = 20;}
        if(Tpunch >= 20){
            punch = false
        } else {
            punch = true;
            //hero.body.velocity.x = 0;
        }
        if(punch){
            hero.animations.play('punch');
        } else if(collide && walk && !punch && Twalk >= 5){
            hero.animations.play('walk');
        } else if(!collide && !punch){
            hero.animations.play('jump');
        } else if (collide && !walk && !punch && Twalk < 5) {
            hero.animations.play('idle');
        }

        //andar + atacar
        //pular + atacar
        //pular + andar
        //parado + atacar -ok
        //parado + pular -ok
        //andar -ok
        //parado -ok
        //furia (atacar combo)
        //atingido
        //morto


/*
	    if(atkButton.downDuration(20)){//atkButton.isDown
	    	this.attack();
	    } else {
	    	this.endattack();
	    }
	    if(jumpButton.isDown){
	    	this.jumper();
	    }else{
	    	this.floorer();
	    }
	    if(cursors.right.isDown){
	    	this.righter();
	    } else if (cursors.left.isDown){
	    	this.lefter();
	    } else {
	    	this.stoper();
	    }
*/



		if(leftSide){
	    	shovel.scale.x = -1;
	   		shovel.anchor.setTo(0.5, 0.5);
	   		shovel.body.setSize(40, 20, -30, 0);
	   		if (punch && Tpunch < 20){
	    		shovel.angle += 5;
	    		if(shovel.angle >= 45){
	    		    shovel.angle = 45;
	    		}
	    		shovel.x = hero.x - 30;
	   			shovel.y = hero.y - 20;
	    	} else {
	    		shovel.angle = 0;
	    		shovel.x = hero.x - 30;
	   			shovel.y = hero.y + 15;
	    	}
	    } else if (!leftSide){
	    	shovel.scale.x = 1;
	    	shovel.anchor.setTo(0.5, 0.5);
	    	shovel.body.setSize(40, 20, 30, 0);
	    	if (punch && Tpunch < 20){
	    		shovel.angle -= 5;
                if(shovel.angle <= -45){
                    shovel.angle = -45;
                }
	    		shovel.x = hero.x + 30;
	   			shovel.y = hero.y - 20;
	    	} else {
	    		shovel.angle = 0;
	    		shovel.x = hero.x + 30;
	   			shovel.y = hero.y + 15;
	    	}
	    }


		countEnemy += this.time.elapsed/1000;
        if(countEnemy > enemySpawn && numberEnemies <= 7){
            countEnemy = 0;
            numberEnemies += 1;
            enemySpawn = this.game.rnd.integerInRange(1, 5);
            sideEnemy = this.game.rnd.integerInRange(0, 1);
            this.createEnemy();
        }
        enemies.forEach(function(enemy){
            if(hero.x + 50 < enemy.x){
                enemy.scale.x = -1
                enemy.body.velocity.x = -75;
                enemy.animations.play('walk');
            } else if (hero.x - 50 > enemy.x) {
                enemy.scale.x = 1;
                enemy.body.velocity.x = 75;
                enemy.animations.play('walk');
            } else {
                enemy.body.velocity.x = 0;
                enemy.animations.play('jump');
            }


        });
	},

    createEnemy: function(){
        switch(sideEnemy){
            case 0:
                var enemy = enemies.create(30, 100, 'enemy');

                var bar = this.game.add.graphics(0, 0);
                bar.beginFill(0xFF3300);
                bar.lineStyle(1, 0x0000FF, 1);
                bar.drawRect(enemy.x, enemy.y, 20, 5);
                break;
            case 1:
                var enemy = enemies.create(1300, 100, 'enemy');

                var bar = this.game.add.graphics(0, 0);
                bar.beginFill(0xFF3300);
                bar.lineStyle(1, 0x0000FF, 1);
                bar.drawRect(enemy.x, enemy.y, 20, 5);
                break;
            default:
                break;
        }

        if(height  >= 600){
            enemy.scale.setTo(1, 1);
        } else {
            enemy.scale.setTo(.8, .8);
        }
        this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.acceleration.y = 980;
        enemy.anchor.setTo(0.5,0.5);
        enemy.animations.add('idle', [0], 0, true);
        enemy.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        enemy.animations.add('jump', [1, 9], 2, false);
        enemy.body.collideWorldBounds = true;

        //enemy.health = 3;
    },





	//contact enemy x hero
	challenger: function (shovel, enemy){
		if(Tpunch == 0){
			enemy.y = enemy.y - 50;
			if(enemy.scale.x == 1){
				enemy.x = enemy.x - 50;
			} else {
				enemy.x = enemy.x + 50;
			}

			/*enemies.forEach(function(enemy){
                enemy.health -= 1;
                if(enemy.health <= 0){
                    enemy.kill();
                    numberEnemies -= 1;
                }
            });*/
		}
	},

    //touch on floor
	touchdown: function(){
	    collide = true;
	},
    //left
	lefter: function(){
        walk = true;
		leftSide = true;
	},
    //right
	righter: function(){
		walk = true;
		leftSide = false;
	},
    //idle
	stoper: function(){
	    walk = false;
	},

    //jump
	jumper:function(){
	    jump = true;
	},
	floorer: function(){
	    jump = false;
	},

    //atack
	attack: function(){
	    Tpunch = 0;
	},
	endattack: function(){
	    punch = false;
	},


	render: function(){
		//this.game.debug.body(shovel, 'rgba(230,200,255,.5)', true);
		this.game.debug.text(this.game.time.fps, 50, 110, "#dcff00");
	}

};