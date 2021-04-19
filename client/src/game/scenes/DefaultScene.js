import Phaser from 'phaser'

let player;
let cursors;

export default class DefaultScene extends Phaser.Scene {
    constructor(_socket) {
        super('DefaultScene-world');
        this.socket = _socket;
        setInterval(() => {
            if(player && player.oldPosition && (player.x !== player.oldPosition.x || player.y !== player.oldPosition.y || player.rotation !== player.oldPosition.rotation)){
                this.socket.emit('playerMovement', {
                    x: player.x,
                    y: player.y
                });
                console.log('position');
            }
            if(player){
                player.oldPosition = {
                    x: player.x,
                    y: player.y
                };
            }
        }, 100);
        this.socket.on('playerMovement', playerPosition => {
            if(player){
                player.setPosition(playerPosition.x, playerPosition.y);
            }
        });
    }

    preload() {
        this.load.image('bricks', '/assets/bricks_50x50.png');
        this.load.image('wall', '/assets/wall_50x50.png');
        this.load.spritesheet('player','/assets/player/player.png', {frameWidth: 48, frameHeight: 48});
        this.load.tilemapTiledJSON('tileMap', '/assets/tilemap/tilemap.json');
    }

    create() {
        const map = this.make.tilemap({key: 'tileMap'})

        // add the tileset image we are using
        const wallsSet = map.addTilesetImage('Wall', 'wall')
        const bricksSet = map.addTilesetImage('Bricks', 'bricks')

        // create the layers we want in the right order
        const wallsLayer = map.createLayer('WallsLayer', wallsSet)
        const bricksLayer = map.createLayer('BricksLayer', bricksSet)


        player = this.physics.add.sprite(600 - 24, 600 - 24, 'player').setScale(0.9).refreshBody();
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [1,5,9,13]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [3,7,11,15]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {frames: [2,6,10,14]}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {frames: [0,4,8,12]}),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        wallsLayer.setCollisionByExclusion([-1]);
        bricksLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player,wallsLayer);
        this.physics.add.collider(player,bricksLayer);
    }

    update() {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.setVelocityY(0);

            player.anims.play('left', true);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.setVelocityY(0);

            player.anims.play('right', true);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityX(0);
            player.setVelocityY(160);

            player.anims.play('down', true);
        }
        else if (cursors.up.isDown)
        {
            player.setVelocityX(0);
            player.setVelocityY(-160);

            player.anims.play('up', true);
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.stop()
        }
    }
}
