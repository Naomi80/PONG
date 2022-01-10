
class Tableau extends Phaser.Scene {
    preload() {
        this.load.image('cercle', 'assets/cercle.png');
        this.load.image('carre', 'assets/carre.png');

    }

    create() {
        this.hauteur=500;
        this.largeur=1000;

    //Balle
       this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle').setOrigin(0, 0);
       this.balle.setDisplaySize(20,20);
       this.balle.body.setBounce(1.1,1.1);
       this.balle.setVelocityX(Phaser.Math.Between(200,-200));
       this.balle.body.setMaxVelocity(500);

    //Mur haut
        this.haut = this.physics.add.sprite(0, 0,'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

    //Mur bas
        this.bas = this.physics.add.sprite(0, this.hauteur-20,'carre').setOrigin(0, 0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

    //Collision
        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);

    //Raquettes
        this.gauche = this.physics.add.sprite(25, 200,'carre').setOrigin(0, 0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droite = this.physics.add.sprite(955, 200,'carre').setOrigin(0, 0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

    }

    initKeyboard(){

    }

    update() {
        if(this.balle.x>this.largeur){
            this.balle.x=0;
        }
        if(this.balle.y<0) {
            this.balle.y = 0;
        }
        if(this.balle.y>this.hauteur) {
            this.balle.y = this.hauteur;
        }

    }
}



