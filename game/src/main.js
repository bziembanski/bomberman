import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	width: 650,
	height: 650,
	backgroundColor: '#2b2b3e',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
