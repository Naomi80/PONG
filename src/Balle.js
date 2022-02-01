class Balle {
    constructor(Tableau){
        this.scene = Tableau
        this.balle = this.scene.physics.add.sprite(0, 0, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.2,1.2);
        this.balle.body.setMaxVelocityX(900);
        this.balle.body.setMaxVelocityY(900);
        this.balle.body.setAllowGravity(false)
    }
}