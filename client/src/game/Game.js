import React,{Component} from 'react'
import Phaser from 'phaser'
import {IonPhaser} from '@ion-phaser/react'
import DefaultScene from "./scenes/DefaultScene";


class Game extends Component {
    state = {
        initialize: true,
        game: {
            width: 650,
            height: 650,
            type: Phaser.AUTO,
            backgroundColor: '#2b2b3e',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 0}
                }
            },
            scene: DefaultScene
        }
    }
    render() {
        const { initialize, game } = this.state
        return (
            <IonPhaser game={game} initialize={initialize} />
        )
    }
}
export default Game;