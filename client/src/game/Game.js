import React,{Component} from 'react';
import Phaser from 'phaser';
import {IonPhaser} from '@ion-phaser/react';
import DefaultScene from "./scenes/DefaultScene";

const scene =  new DefaultScene();
class Game extends Component {
    state = {
        initialize: true,
        game: {
            width: 676,
            height: 676,
            type: Phaser.AUTO,
            backgroundColor: '#212529',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: {y: 0}
                }
            }
            scene:
                {
                    init: function (){
                        this.mainPlayerNumber=3;
                    },
                    preload:scene.preload,
                    create:scene.create,
                    update:scene.update
                }
        }
    }
    render() {
        const { initialize, game } = this.state;

        return (
            <IonPhaser game={game} initialize={initialize}/>
        )
    }
}
export default Game;