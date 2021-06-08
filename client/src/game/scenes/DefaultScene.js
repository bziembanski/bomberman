import Phaser from 'phaser'
import TweenHelper from "../TweenHelper";

const tileSize = 52;
let scene;
let cursors;
let spacebar;
let playerBombsCount = 0;
let map;
let wallsLayer;
let bricksLayer;
let upgrades;
let bombs;
let fire;

let player;
let otherPlayers;

const gameConfig = {
    explosionDisplayTime: 1000,
    explosionDelay: 2000,
    upgradeDropChance: 10,
    invincibilityTime: 2000,
    upgradesValues: {
        bomb: 1,
        explosion: 1,
        kick: 2,
        speed: 50
    }
};

function PlayerStats(props, position) {
    this.position = position ? new Position(position.x, position.y) : props.position;
    this.lives = props.lives;
    this.bomb = props.bomb;
    this.explosion = props.explosion;
    this.kick = props.kick;
    this.speed = props.speed;
    this.isInvincible = props.isInvincible;
}

const positions = [
    new Position(75, 75),
    new Position(600, 75),
    new Position(75, 600),
    new Position(600, 600)
];


const defaultStats = new PlayerStats ({
    position: new Position(600, 600),
    lives: 3,
    bomb: 2,
    explosion: 1,
    kick: 2,  //11 is a limit, going above will cause bugs (features)
    speed: 150,
    isInvincible: false
});

function Position(x, y) {
    this.x = x;
    this.y = y;
}

function expandExplosion(bombPos, tilePos, step, explosions) {
    let horizontalStep = step.x, verticalStep = step.y;
    while (Math.abs(horizontalStep) <= player.stats.explosion
    && Math.abs(verticalStep) <= player.stats.explosion
    && wallsLayer.getTileAt(tilePos.x + horizontalStep, tilePos.y + verticalStep) === null) {
        explosions.push(fire.create(bombPos.x + horizontalStep * tileSize, bombPos.y + verticalStep * tileSize, "explosion").setScale(0.1));

        let bricks = bricksLayer.getTileAt(tilePos.x + horizontalStep, tilePos.y + verticalStep);
        if (bricks !== null) {
            map.removeTileAt(tilePos.x + horizontalStep, tilePos.y + verticalStep, true, true, "BricksLayer");
            createUpgrade((tilePos.x + horizontalStep) * tileSize + tileSize / 2 - 1, (tilePos.y + verticalStep) * tileSize + tileSize / 2 + 1);
            break;
        }

        verticalStep += step.y;
        horizontalStep += step.x;
    }
}

function deleteExplosions(explosions) {
    setTimeout(() => {
        explosions.forEach((explosion) => {
            explosion.destroy();
        })
    }, gameConfig.explosionDisplayTime, explosions);
}

function bombExplosion(scene, bomb) {
    let tilePos = new Position(
        Math.floor(bomb.x / tileSize),
        Math.floor(bomb.y / tileSize)
    );

    let bombPos = new Position(
        tilePos.x * tileSize + tileSize / 2,
        tilePos.y * tileSize + tileSize / 2
    );

    const explosions = [];
    explosions.push(fire.create(bombPos.x, bombPos.y, 'explosion').setScale(0.1));

    expandExplosion(bombPos, tilePos, new Position(-1, 0), explosions);
    expandExplosion(bombPos, tilePos, new Position(1, 0), explosions);
    expandExplosion(bombPos, tilePos, new Position(0, 1), explosions);
    expandExplosion(bombPos, tilePos, new Position(0, -1), explosions);

    explosions.forEach(explosion => {
        explosion.body.immovable = true;
        explosion.body.moves = false;
    })

    deleteExplosions(explosions);
}

function createUpgrade(upgradeX, upgradeY) {
    const random = Phaser.Math.Between(0, gameConfig.upgradeDropChance);
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
        default:
            break;
    }
}

function collectUpgrade(_, upgrade) {
    switch (upgrade.texture.key) {
        case "bombU":
            player.stats.bomb += gameConfig.upgradesValues.bomb;
            break;
        case "explosionU":
            player.stats.explosion += gameConfig.upgradesValues.explosion;
            break;
        case "kickU":
            player.stats.kick += gameConfig.upgradesValues.kick;
            if (player.stats.kick > 11) player.stats.kick = 11;
            break;
        case "speedU":
            player.stats.speed += gameConfig.upgradesValues.speed;
            break;
    }
    upgrade.destroy();
}

function bombCollideCallback(bomb1, bomb2) {
    bomb1.setPushable(false);
    bomb2.setPushable(false);

    bomb1.body.setVelocity(0);
    bomb2.body.setVelocity(0);
}

function playerWithBombCollideCallback(_, bomb) {
    bomb.setPushable(true);
    bomb.body.velocity.x *= player.stats.kick;
    bomb.body.velocity.y *= player.stats.kick;
}

function bombWithWallCollider(bomb) {
    bomb.setPushable(false);
    bomb.body.velocity.x = 0;
    bomb.body.velocity.y = 0;
}

function gettingDamage() {
    if (!player.stats.isInvincible) {
        player.stats.lives--;
        if (player.stats.lives < 1) {
            player.sprite.anims.stop();
            player.sprite.tint = 0xFF0000;
            player.sprite.setFrame(1);
            setTimeout(() => player.sprite.disableBody(true, true), 2000, player.sprite);
        } else {
            player.stats.isInvincible = true;
            TweenHelper.flashElement(scene, player.sprite, gameConfig.invincibilityTime / 200);
            setTimeout(() => player.stats.isInvincible = false, gameConfig.invincibilityTime);
        }
    }
}

export default class DefaultScene extends Phaser.Scene {
    constructor() {
        super('DefaultScene-world');
    }

    preload() {
        this.load.image('bricks', '/assets/bricks_50x50.png');
        this.load.image('wall', '/assets/wall_50x50.png');

        //players
        this.load.spritesheet('player0', '/assets/player/player_red.png', {frameWidth: 20, frameHeight: 25});
        this.load.spritesheet('player1', '/assets/player/player_green.png', {frameWidth: 20, frameHeight: 25});
        this.load.spritesheet('player2', '/assets/player/player_yellow.png', {frameWidth: 20, frameHeight: 25});
        this.load.spritesheet('player3', '/assets/player/player_blue.png', {frameWidth: 20, frameHeight: 25});

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
        console.log(this.roomId);
        scene = this;
        this.physics.world.setBounds(tileSize, tileSize, 11 * tileSize, 11 * tileSize);

        map = this.make.tilemap({key: 'tileMap'});

        // add the tileset image we are using
        const wallsSet = map.addTilesetImage('Wall', 'wall');
        const bricksSet = map.addTilesetImage('Bricks', 'bricks');

        // create the layers we want in the right order
        wallsLayer = map.createLayer('WallsLayer', wallsSet);
        bricksLayer = map.createLayer('BricksLayer', bricksSet);

        player = {
            name: "player" + this.mainPlayerNumber,
            sprite: undefined,
            stats: new PlayerStats(defaultStats,positions[this.mainPlayerNumber])
        }

        otherPlayers = positions.map((position, index) =>{
            if((index) !== this.mainPlayerNumber){
                return {
                    name: "player"+ index,
                    positionInRoom: index,
                    sprite: undefined,
                    stats: new PlayerStats(defaultStats, position)
                }
            }
        }).filter(player=>player!==undefined);
        console.log(this.socket)

        player.sprite = this.physics.add.sprite(player.stats.position.x, player.stats.position.y, player.name).setScale(1.7).refreshBody()
        player.sprite.setCollideWorldBounds(true);

        otherPlayers.forEach(player => {
            player.sprite = this.physics.add.sprite(player.stats.position.x, player.stats.position.y, player.name).setScale(1.7).refreshBody();
            player.sprite.setCollideWorldBounds(true);
        })


        const anims = [
            {
                key: "left",
                frames:[3, 7, 11, 15, 19, 23, 27, 31]
            },
            {
                key: "right",
                frames:[2, 6, 10, 14, 18, 22, 26, 30]
            },
            {
                key: "up",
                frames:[0, 4, 8, 12, 16, 20, 24, 28]
            },
            {
                key: "down",
                frames:[1, 5, 9, 13, 17, 21, 25, 29]
            },
        ]

        anims.forEach(anim => {
            this.anims.create({
                key: anim.key,
                frames: this.anims.generateFrameNumbers(player.name, {frames: anim.frames}),
                frameRate: 10,
                repeat: -1
            });
        });

        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        wallsLayer.setCollisionByExclusion([-1]);
        bricksLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player.sprite, wallsLayer);
        this.physics.add.collider(player.sprite, bricksLayer);

        //bombs
        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, bombs, bombCollideCallback);
        this.physics.add.collider(player.sprite, bombs, playerWithBombCollideCallback);
        this.physics.add.collider(bombs, wallsLayer, bombWithWallCollider);
        this.physics.add.collider(bombs, bricksLayer, bombWithWallCollider);

        //bombs animations
        this.anims.create({
            key: 'bombTicking',
            frames: this.anims.generateFrameNumbers('bomb', {frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]}),
            duration: gameConfig.explosionDelay,
            repeat: 0,
            hideOnComplete: true
        });

        //upgrades group
        upgrades = this.physics.add.group();
        this.physics.add.overlap(player.sprite, upgrades, collectUpgrade, null, this);

        //fire
        fire = this.physics.add.group();
        this.physics.add.overlap(player.sprite, fire, gettingDamage);
        this.physics.add.collider(player.sprite, fire);

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
        if (player.stats.lives > 0) {
            if (cursors.left.isDown && !player.sprite.body.touching.left) {
                player.sprite.setVelocityX(-player.stats.speed);
                player.sprite.setVelocityY(0);

                player.sprite.anims.play('left', true);
            } else if (cursors.right.isDown && !player.sprite.body.touching.right) {
                player.sprite.setVelocityX(player.stats.speed);
                player.sprite.setVelocityY(0);

                player.sprite.anims.play('right', true);
            } else if (cursors.down.isDown && !player.sprite.body.touching.down) {
                player.sprite.setVelocityX(0);
                player.sprite.setVelocityY(player.stats.speed);

                player.sprite.anims.play('down', true);
            } else if (cursors.up.isDown && !player.sprite.body.touching.up) {
                player.sprite.setVelocityX(0);
                player.sprite.setVelocityY(-player.stats.speed);

                player.sprite.anims.play('up', true);
            } else {
                player.sprite.setVelocityX(0);
                player.sprite.setVelocityY(0);
                player.sprite.anims.stop();
            }

            //creating bomb
            if (Phaser.Input.Keyboard.JustDown(spacebar) && playerBombsCount < player.stats.bomb) {
                const bombX = Math.ceil(player.sprite.x / tileSize) * tileSize - tileSize / 2;
                const bombY = Math.ceil(player.sprite.y / tileSize) * tileSize - tileSize / 2;

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
}
