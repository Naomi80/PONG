let gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '#000000',
    parent: 'game',
    fps: {
        target: 30,
        //forceSetTimeOut : True,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200}
        }
    },
    scene: new Tableau()
};
let game = new Phaser.Game(gameConfig);
