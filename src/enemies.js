var basicEnemy;

function Enemies(game){
    this.game = game;
}

Enemies.prototype.create = function() {
 
    basicEnemy = new EnemyBasic(this.game);
    basicEnemy.create();
}

Enemies.prototype.update = function() {
    basicEnemy.update();   
}


Enemies.prototype.getEnemyPool = function(type) {
 
    switch(type) {
        case 'basic':
        	return basicEnemy.getEnemyPool();
        	break;
        default:
            return basicEnemy.getEnemyPool();
            break;
    }

}
