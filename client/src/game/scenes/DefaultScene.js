import Phaser from 'phaser'

const tileSize = 52;
const explosionDisplayTime = 1000;
const explosionDelay = 2000;
const upgradeDropChance = 10;
const upgradesValue = {
    bomb: 1,
    explosion: 2,
    kick: 2,
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
let bombs;
let playerStats = {
    bomb: 2,
    explosion: 1,
    kick: 2,  //11 is a limit, going above will cause bugs (features)
    speed: 150,
    throw: 0
};


function bombExplosion(scene, bomb) {
    let X_tile = Math.floor(bomb.x / tileSize);
    let Y_tile = Math.floor(bomb.y / tileSize);

    let X_bomb = X_tile * tileSize + tileSize / 2;
    let Y_bomb = Y_tile * tileSize + tileSize / 2;
    let step = 1;

    const explosions = [];
    explosions.push(scene.add.image(X_bomb, Y_bomb, 'explosion').setScale(0.1));

    //leftExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X_tile - step, Y_tile) === null) {
        explosions.push(scene.add.image(X_bomb - step * tileSize, Y_bomb, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X_tile - step, Y_tile);
        if (bricks !== null) {
            map.removeTileAt(X_tile - step, Y_tile, true, true, "BricksLayer");
            createUpgrade((X_tile - step) * tileSize + tileSize / 2 - 1, Y_tile * tileSize + tileSize / 2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //rightExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X_tile + step, Y_tile) === null) {
        explosions.push(scene.add.image(X_bomb + step * tileSize, Y_bomb, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X_tile + step, Y_tile);
        if (bricks !== null) {
            map.removeTileAt(X_tile + step, Y_tile, true, true, "BricksLayer");
            createUpgrade((X_tile + step) * tileSize + tileSize / 2 - 1, Y_tile * tileSize + tileSize / 2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //upExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X_tile, Y_tile - step) === null) {
        explosions.push(scene.add.image(X_bomb, Y_bomb - step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X_tile, Y_tile - step);
        if (bricks !== null) {
            map.removeTileAt(X_tile, Y_tile - step, true, true, "BricksLayer");
            createUpgrade(X_tile * tileSize + tileSize / 2 - 1, (Y_tile - step) * tileSize + tileSize / 2 + 1);
            break;
        }

        step++;
    }
    step = 1;

    //downExpansion
    while (step <= playerStats.explosion && wallsLayer.getTileAt(X_tile, Y_tile + step) === null) {
        explosions.push(scene.add.image(X_bomb, Y_bomb + step * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(X_tile, Y_tile + step);
        if (bricks !== null) {
            map.removeTileAt(X_tile, Y_tile + step, true, true, "BricksLayer");
            createUpgrade(X_tile * tileSize + tileSize / 2 - 1, (Y_tile + step) * tileSize + tileSize / 2 + 1);
            break;
        }

        step++;
    }

    //deleting an explosion
    setTimeout(() => {
        explosions.forEach((explosion) => {
            explosion.destroy();
        })
    }, explosionDisplayTime, explosions);
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

function collectUpgrade(player, upgrade) {
    switch (upgrade.texture.key) {
        case "bombU":
            playerStats.bomb = playerStats.bomb + upgradesValue.bomb;
            break;
        case "explosionU":
            playerStats.explosion = playerStats.explosion + upgradesValue.explosion;
            break;
        case "kickU":
            playerStats.kick = playerStats.kick + upgradesValue.kick;
            if (playerStats.kick > 11) playerStats.kick = 11;
            break;
        case "speedU":
            playerStats.speed = playerStats.speed + upgradesValue.speed;
            break;
        case "throwU":
            playerStats.throw = playerStats.throw + 1;//todo
            break;
    }
    upgrade.destroy();

    console.log(playerStats);
}

function bombCollideCallback(bomb1, bomb2) {
    bomb1.setPushable(false);
    bomb2.setPushable(false);

    bomb1.body.setVelocity(0);
    bomb2.body.setVelocity(0);
}

function playerWithBombCollideCallback(player, bomb) {
    bomb.setPushable(true);
    bomb.body.velocity.x *= playerStats.kick;
    bomb.body.velocity.y *= playerStats.kick;
}

function bombWithWall(bomb) {
    bomb.setPushable(false);
    bomb.body.velocity.x = 0;
    bomb.body.velocity.y = 0;
}

export default class DefaultScene extends Phaser.Scene {
    constructor() {
        super('DefaultScene-world');
    }

    preload() {
        this.load.image('bricks', '/assets/bricks_50x50.png');
        this.load.image('wall', '/assets/wall_50x50.png');
        this.load.spritesheet('player', '/assets/player/player_blue.png', {frameWidth: 20, frameHeight: 25});
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
        this.physics.world.setBounds(tileSize, tileSize, 11 * tileSize, 11 * tileSize);

        map = this.make.tilemap({key: 'tileMap'});

        // add the tileset image we are using
        const wallsSet = map.addTilesetImage('Wall', 'wall');
        const bricksSet = map.addTilesetImage('Bricks', 'bricks');

        // create the layers we want in the right order
        wallsLayer = map.createLayer('WallsLayer', wallsSet);
        bricksLayer = map.createLayer('BricksLayer', bricksSet);

        player = this.physics.add.sprite(624 - 24, 624 - 24, 'player').setScale(1.7).refreshBody();
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [3, 7, 11, 15, 19, 23, 27, 31]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [2, 6, 10, 14, 18, 22, 26, 30]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 4, 8, 12, 16, 20, 24, 28]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [1, 5, 9, 13, 17, 21, 25, 29]}),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        wallsLayer.setCollisionByExclusion([-1]);
        bricksLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, wallsLayer);
        this.physics.add.collider(player, bricksLayer);

        //bombs
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, bombs, bombCollideCallback);
        this.physics.add.collider(player, bombs, playerWithBombCollideCallback);
        this.physics.add.collider(bombs, wallsLayer, bombWithWall);
        this.physics.add.collider(bombs, bricksLayer, bombWithWall);

        //bombs animations
        this.anims.create({
            key: 'bombTicking',
            frames: this.anims.generateFrameNumbers('bomb', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]}),
            duration: explosionDelay,
            repeat: 0,
            hideOnComplete: true
        });

        //upgrades group
        upgrades = this.physics.add.group();
        this.physics.add.overlap(player, upgrades, collectUpgrade, null, this);

        const resize = () => {
            const w = window.innerWidth * 0.5
            const h = window.innerHeight * 0.92

            let size = this.game.config.width;

            let scale = Math.min(w / size, h / size)

            // scale the width and height of the css
            this.game.canvas.style.width = size * scale + 'px'
            this.game.canvas.style.height = size * scale + 'px'

            // center the game with css margin
            this.game.canvas.style.marginTop = `${(h - size * scale) / 2}px`
            this.game.canvas.style.marginLeft = `${(w - size * scale) / 2}px`
        }
        window.addEventListener('resize', event => {
            resize();
        })
        resize();
    }

    update() {
        if (cursors.left.isDown && !player.body.touching.left) {
            player.setVelocityX(-playerStats.speed);
            player.setVelocityY(0);

            player.anims.play('left', true);
        } else if (cursors.right.isDown && !player.body.touching.right) {
            player.setVelocityX(playerStats.speed);
            player.setVelocityY(0);

            player.anims.play('right', true);
        } else if (cursors.down.isDown && !player.body.touching.down) {
            player.setVelocityX(0);
            player.setVelocityY(playerStats.speed);

            player.anims.play('down', true);
        } else if (cursors.up.isDown && !player.body.touching.up) {
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
            const bombX = Math.ceil(player.x / tileSize) * tileSize - tileSize / 2;
            const bombY = Math.ceil(player.y / tileSize) * tileSize - tileSize / 2;

            let bomb = bombs.create(bombX, bombY, 'bomb');
            bomb.anims.play('bombTicking', true);
            playerBombsCount++;

            bomb.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                playerBombsCount--;
                bombExplosion(this, bomb);
                bomb.destroy();
            }, this);
        }
    }
}
