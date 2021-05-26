import Phaser from 'phaser'

const tileSize = 52;
const explosionDelay = 1000;

let players = [];
let cursors;
let spacebar;
let playerBombsCount = 0;
let map;
let wallsLayer;
let bricksLayer;


function bombExplosion(bombX, bombY, scene) {
    const explosions = [];
    explosions.push(scene.add.image(bombX, bombY, 'explosion').setScale(0.1));

    let X = Math.floor(bombX / tileSize);
    let Y = Math.floor(bombY / tileSize);
    let step = 1;


    //leftExpansion
    while (wallsLayer.getTileAt(X - step, Y) === null) {
        explosions.push(scene.add.image(bombX - step * tileSize, bombY, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X - step, Y);
        if (bricks !== null) {
            map.removeTileAt(X - step, Y, true, true, "BricksLayer");
            break;
        }

        step++;
    }
    step = 1;

    //rightExpansion
    while (wallsLayer.getTileAt(X + step, Y) === null) {
        explosions.push(scene.add.image(bombX + step * tileSize, bombY, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X + step, Y);
        if (bricks !== null) {
            map.removeTileAt(X + step, Y, true, true, "BricksLayer");
            break;
        }

        step++;
    }
    step = 1;

    //upExpansion
    while (wallsLayer.getTileAt(X, Y - step) === null) {
        explosions.push(scene.add.image(bombX, bombY - step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X, Y - step);
        if (bricks !== null) {
            map.removeTileAt(X, Y - step, true, true, "BricksLayer");
            break;
        }

        step++;
    }
    step = 1;

    //downExpansion
    while (wallsLayer.getTileAt(X, Y + step) === null) {
        explosions.push(scene.add.image(bombX, bombY + step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X, Y + step);
        if (bricks !== null) {
            map.removeTileAt(X, Y + step, true, true, "BricksLayer");
            break;
        }

        step++;
    }

    //deleting an explosion
    setTimeout(() => {
        explosions.forEach((explosion) => {
            explosion.destroy();
        })
    }, explosionDelay, explosions);
}


export default class DefaultScene extends Phaser.Scene {
    constructor() {
        super('DefaultScene-world');
    }

    preload() {
        this.load.image('bricks', '/assets/bricks_50x50.png');
        this.load.image('wall', '/assets/wall_50x50.png');
		
		let i;
		for (i = 0; i < 4; i++) {
			this.load.spritesheet('player'+i, '/assets/player/player'+i+'.png', {frameWidth: 20, frameHeight: 25});
		}

        this.load.tilemapTiledJSON('tileMap', '/assets/tilemap/tilemap.json');
        this.load.spritesheet('bomb', '/assets/bomb.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('explosion', '/assets/explosion.png');
    }

    create() {
        map = this.make.tilemap({key: 'tileMap'});

        // add the tileset image we are using
        const wallsSet = map.addTilesetImage('Wall', 'wall');
        const bricksSet = map.addTilesetImage('Bricks', 'bricks');
        
        // create the layers we want in the right order
        
        wallsLayer = map.createLayer('WallsLayer', wallsSet);
        bricksLayer = map.createLayer('BricksLayer', bricksSet);
        map.randomize(1,3,7,7)
        

        players[0] = this.physics.add.sprite(75, 75, 'player0').setScale(2).refreshBody();
		players[1] = this.physics.add.sprite(624 , 75, 'player1').setScale(2).refreshBody();
		players[2] = this.physics.add.sprite(75, 624 , 'player2').setScale(2).refreshBody();
		players[3] = this.physics.add.sprite(624 , 624 , 'player3').setScale(2).refreshBody();
		
		let i;
		for (i = 0; i < 4; i++) {
			players[i].setCollideWorldBounds(true);

			this.anims.create({
				key: 'left'+i,
				frames: this.anims.generateFrameNumbers('player'+i, {frames: [3, 7, 11, 15, 19, 23, 27, 31]}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'right'+i,
				frames: this.anims.generateFrameNumbers('player'+i, {frames: [2, 6, 10, 14, 18, 22, 26, 30]}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'up'+i,
				frames: this.anims.generateFrameNumbers('player'+i, {frames: [0, 4, 8, 12, 16, 20, 24, 28]}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'down'+i,
				frames: this.anims.generateFrameNumbers('player'+i, {frames: [1, 5, 9, 13, 17, 21, 25, 29]}),
				frameRate: 10,
				repeat: -1
			});
		}

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        wallsLayer.setCollisionByExclusion([-1]);
        bricksLayer.setCollisionByExclusion([-1]);
		
		
		for (i = 0; i < 4; i++) {
			this.physics.add.collider(players[i], wallsLayer);
			this.physics.add.collider(players[i], bricksLayer);
		}

        //bombs animations
        this.anims.create({
            key: 'bombTicking',
            frames: this.anims.generateFrameNumbers('bomb', {frames: [0, 0]}),
            frameRate: 1,
            repeat: 0,
            hideOnComplete: true
        });

        //temporary game resize, dont know if this is ok
        let scale = 845 / 650
        this.game.canvas.style.width = 650 * scale + 'px'
        this.game.canvas.style.height = 650 * scale + 'px'
    }

    update() {
		let i;
        let moveX = false, moveY = false;
		
		for (i = 0; i < 4; i++) {
			if (cursors.left.isDown && !players[i].body.touching.left) {
				players[i].setVelocityX(-160);
				//players[i].setVelocityY(0);
                moveX = true;
				players[i].anims.play('left'+i, true);
                
			} else if (cursors.right.isDown) {
				players[i].setVelocityX(160);
				//players[i].setVelocityY(0);
                moveX = true;
				players[i].anims.play('right'+i, true);
                
			}
            else {
                players[i].setVelocityX(0);
            }
            
            if (cursors.down.isDown) {
				//players[i].setVelocityX(0);
				players[i].setVelocityY(160);
                moveY = true;
                
				if (!moveX) players[i].anims.play('down'+i, true);
			} else if (cursors.up.isDown) {
				//players[i].setVelocityX(0);
				players[i].setVelocityY(-160);
                moveY = true;
                
				if (!moveX) players[i].anims.play('up'+i, true);

			} else {
				//players[i].setVelocityX(0);
				players[i].setVelocityY(0);
				//players[i].anims.stop();
			}

            if (!moveX && !moveY)
                players[i].anims.stop();
		}

        //creating bomb
        if (Phaser.Input.Keyboard.JustDown(spacebar) && playerBombsCount < 3) {
            // let bomb = bombs.create(player.x,player.y,'bomb').setScale(0.5);
            const bombX = Math.ceil(players[0].x / tileSize) * tileSize - tileSize / 2;
            const bombY = Math.ceil(players[0].y / tileSize) * tileSize - tileSize / 2;

            let bomb = this.physics.add.sprite(bombX, bombY, 'bomb').setScale(0.5);
            bomb.anims.play('bombTicking', true);
            playerBombsCount++;

            bomb.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                playerBombsCount--;
                bombExplosion(bombX, bombY, this);
            }, this);
        }

        
    }

}
