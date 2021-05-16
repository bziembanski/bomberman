import Phaser from 'phaser'

const tileSize = 52;
const explosionDelay = 1000;
const upgradeDropChance = 10;
const upgradesValue = {
    bomb: 1,
    explosion: 2,
    kick: 0,//todo
    speed: 50,
    throw: 0//todo
}

let player;
let cursors;
let spacebar;
let playerBombsCount = 0;
let map;
let wallsLayer;
let bricksLayer;
let upgrades;
let playerStats = {
    bomb: 1,
    explosion: 1,
    kick: 0,
    speed: 150,
    throw: 0
};


function bombExplosion(bombX, bombY, scene) {
    const explosions = [];
    explosions.push(scene.add.image(bombX, bombY, 'explosion').setScale(0.1));

    let X = Math.floor(bombX / tileSize);
    let Y = Math.floor(bombY / tileSize);
    let step = 1;


    //leftExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X - step, Y) === null) {
        explosions.push(scene.add.image(bombX - step * tileSize, bombY, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X - step, Y);
        if (bricks !== null) {
            map.removeTileAt(X - step, Y, true, true, "BricksLayer");
            createUpgrade((X - step) * tileSize + tileSize/2 - 1, Y * tileSize + tileSize/2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //rightExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X + step, Y) === null) {
        explosions.push(scene.add.image(bombX + step * tileSize, bombY, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X + step, Y);
        if (bricks !== null) {
            map.removeTileAt(X + step, Y, true, true, "BricksLayer");
            createUpgrade((X + step) * tileSize + tileSize/2 - 1, Y * tileSize + tileSize/2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //upExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X, Y - step) === null) {
        explosions.push(scene.add.image(bombX, bombY - step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X, Y - step);
        if (bricks !== null) {
            map.removeTileAt(X, Y - step, true, true, "BricksLayer");
            createUpgrade(X * tileSize + tileSize/2 - 1, (Y - step) * tileSize + tileSize/2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //downExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X, Y + step) === null) {
        explosions.push(scene.add.image(bombX, bombY + step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X, Y + step);
        if (bricks !== null) {
            map.removeTileAt(X, Y + step, true, true, "BricksLayer");
            createUpgrade(X * tileSize + tileSize/2 -1, (Y + step) * tileSize + tileSize/2 + 1);
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

function createUpgrade(upgradeX, upgradeY) {
    //Random number
    const random = Phaser.Math.Between(0, upgradeDropChance);
    switch (random) {
        case 0:
            upgrades.create(upgradeX, upgradeY, 'bombU');
            break;
        case 1:
            upgrades.create(upgradeX, upgradeY, 'explosionU');
            break;
        case 2:
            upgrades.create(upgradeX, upgradeY, 'kickU');
            break;
        case 3:
            upgrades.create(upgradeX, upgradeY, 'speedU');
            break;
        case 4:
            upgrades.create(upgradeX, upgradeY, 'throwU');
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            break;
    }
}

function collectUpgrade(player, upgrade){
    upgrade.disableBody(true, true);
    switch (upgrade.texture.key){
        case "bombU":
            playerStats.bomb = playerStats.bomb + upgradesValue.bomb;
            break;
        case "explosionU":
            playerStats.explosion = playerStats.explosion + upgradesValue.explosion;
            break;
        case "kickU":
            playerStats.kick = playerStats.kick + 1;//todo
            break;
        case "speedU":
            playerStats.speed = playerStats.speed + upgradesValue.speed;
            break;
        case "throwU":
            playerStats.throw = playerStats.throw + 1;//todo
            break;
    }
}

export default class DefaultScene extends Phaser.Scene {
    constructor() {
        super('DefaultScene-world');
    }

    preload() {
        this.load.image('bricks', '/assets/bricks_50x50.png');
        this.load.image('wall', '/assets/wall_50x50.png');
        this.load.spritesheet('player', '/assets/player/player.png', {frameWidth: 48, frameHeight: 48});
        this.load.tilemapTiledJSON('tileMap', '/assets/tilemap/tilemap.json');
        this.load.spritesheet('bomb', '/assets/bomba.png', {frameWidth: 50, frameHeight: 50});
        this.load.image('explosion', '/assets/explosion.png');

        //upgrades
        this.load.image('bombU', '/assets/upgrade_icons/bomb_50x50.png');
        this.load.image('explosionU', '/assets/upgrade_icons/explosion_50x50.png');
        this.load.image('kickU', '/assets/upgrade_icons/kick_50x50.png');
        this.load.image('speedU', '/assets/upgrade_icons/speed_50x50.png');
        this.load.image('throwU', '/assets/upgrade_icons/throw_50x50.png');
    }

    create() {
        map = this.make.tilemap({key: 'tileMap'});

        // add the tileset image we are using
        const wallsSet = map.addTilesetImage('Wall', 'wall');
        const bricksSet = map.addTilesetImage('Bricks', 'bricks');

        // create the layers we want in the right order
        wallsLayer = map.createLayer('WallsLayer', wallsSet);
        bricksLayer = map.createLayer('BricksLayer', bricksSet);

        player = this.physics.add.sprite(624 - 24, 624 - 24, 'player').setScale(0.9).refreshBody();
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [1, 5, 9, 13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [3, 7, 11, 15]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [2, 6, 10, 14]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 4, 8, 12]}),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        wallsLayer.setCollisionByExclusion([-1]);
        bricksLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, wallsLayer);
        this.physics.add.collider(player, bricksLayer);

        //bombs animations
        this.anims.create({
            key: 'bombTicking',
            frames: this.anims.generateFrameNumbers('bomb', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]}),
            frameRate: 5,
            repeat: 0,
            hideOnComplete: true
        });

        //upgrades group
        upgrades = this.physics.add.group();
        this.physics.add.overlap(player, upgrades, collectUpgrade, null, this);


        //temporary game resize, dont know if this is ok
        let scale = 845 / 650
        this.game.canvas.style.width = 650 * scale + 'px'
        this.game.canvas.style.height = 650 * scale + 'px'
    }

    update() {
        if (cursors.left.isDown && !player.body.touching.left) {
            player.setVelocityX(-playerStats.speed);
            player.setVelocityY(0);

            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(playerStats.speed);
            player.setVelocityY(0);

            player.anims.play('right', true);
        } else if (cursors.down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(playerStats.speed);

            player.anims.play('down', true);
        } else if (cursors.up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-playerStats.speed);

            player.anims.play('up', true);
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.stop();
        }

        //creating bomb
        if (Phaser.Input.Keyboard.JustDown(spacebar) && playerBombsCount < playerStats.bomb) {
            // let bomb = bombs.create(player.x,player.y,'bomb').setScale(0.5);
            const bombX = Math.ceil(player.x / tileSize) * tileSize - tileSize / 2;
            const bombY = Math.ceil(player.y / tileSize) * tileSize - tileSize / 2;

            let bomb = this.physics.add.sprite(bombX, bombY, 'bomb');
            bomb.anims.play('bombTicking', true);
            playerBombsCount++;

            bomb.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                playerBombsCount--;
                bombExplosion(bombX, bombY, this);
            }, this);
        }
    }
}
