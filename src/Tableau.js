let keyS;
let keyX;
let keyJ;
let keyN;
class Tableau extends Phaser.Scene {
    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('cercle', 'assets/cercle.png');
        this.load.image('carre', 'assets/carre.png');
        this.load.image('raquette', 'assets/raquette.png');
        this.load.image('raquette2', 'assets/raquette2.png');
        this.load.image('obstacle', 'assets/obstacle.png');

        this.load.audio('applause', 'assets/son/applause.mp3')
        this.load.audio('poc', 'assets/son/poc.mp3')


    }



    create() {
        this.hauteur=500;
        this.largeur=1000;
        let me=this;

        //Son
        this.applause= this.sound.add('applause', {loop: false});
        this.applause.volume = 1
        this.poc= this.sound.add('poc', {loop: false});
        this.poc.volume = 1

        //Fond
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //Balle
        this.Bballe = new Balle(this)

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


        //Collision balle/murs
        this.physics.add.collider(this.Bballe.balle,this.bas);
        this.physics.add.collider(this.Bballe.balle,this.haut);



        this.joueurGauche = new Joueur('J1','joueurGauche',this, 0);
        this.joueurDroite = new Joueur('J2','joueurDroite', this, 0);

        this.obstacle = this.physics.add.sprite(492, 0, 'obstacle').setOrigin(0, 0);
        this.obstacle.setDisplaySize(15,110);
        this.obstacle.setImmovable(true);
        this.obstacle.body.setAllowGravity(false);
        this.tweens.add({
            targets: this.obstacle,
            duration: 1500,
            y: 380,
            ease:'Sine.easeOut',
            yoyo: true,
            repeat: -1,
        });
        this.physics.add.collider(this.Bballe.balle,this.obstacle, function(){
            me.rebond(me.obstacle);
        });

        this.physics.add.collider(this.Bballe.balle, this.obstacle);

        this.balleAucentre();
        this.initKeyboard();
        this.raquetteAucentre();
    }


    son(){
        this.poc.play()
    }


    rebond(raquette){
        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.Bballe.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);

        this.Bballe.balle.setVelocityY( this.Bballe.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }

    balleAucentre(){
        this.Bballe.balle.x = this.largeur/2
        this.Bballe.balle.y = this.hauteur/2
        this.Bballe.balle.setVelocityX(0)
        this.Bballe.balle.setVelocityY(0)
        this.Bballe.balle.setVelocityX(Math.random()>0.5?-100:100)
    }

    raquetteAucentre(){
        this.joueurGauche.raquette.x = 10
        this.joueurGauche.raquette.y = this.hauteur/2-50

        this.joueurDroite.raquette.x = this.largeur-30
        this.joueurDroite.raquette.y = this.hauteur/2-50
    }

    win(joueur){
        joueur.score ++;
        this.balleAucentre();
        this.raquetteAucentre();
        this.applause.play()
    }

    initKeyboard() {
        let me = this;
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        if (keyS.isUp)
        {
            me.joueurGauche.raquette.setVelocityY(0);
        }
        if (keyJ.isUp)
        {
            me.joueurDroite.raquette.setVelocityY(0);
        }
        if (keyX.isUp)
        {
            me.joueurGauche.raquette.setVelocityY(0);
        }
        if (keyN.isUp)
        {
            me.joueurDroite.raquette.setVelocityY(0);
        }

        if (keyS.isDown)
        {
            if (me.joueurGauche.raquette.y<me.haut.y + 20){
                me.joueurGauche.raquette.setVelocityY(0)
            }
            else{
                me.joueurGauche.raquette.setVelocityY(-300);
            }
        }
        if (keyX.isDown)
        {
            if (me.joueurGauche.raquette.y+100>me.bas.y-5){
                me.joueurGauche.raquette.setVelocityY(0)
            }
            else {
                me.joueurGauche.raquette.setVelocityY(300);
            }
        }
        if (keyJ.isDown)
        {
            if (me.joueurDroite.raquette.y<me.haut.y + 20){
                me.joueurDroite.raquette.setVelocityY(0)
            }
            else{
                me.joueurDroite.raquette.setVelocityY(-300);
            }
        }
        if (keyN.isDown)
        {
            if (me.joueurDroite.raquette.y+100>me.bas.y-5){
                me.joueurDroite.raquette.setVelocityY(0)
            }
            else {
                me.joueurDroite.raquette.setVelocityY(300);
            }
        }
    }
    update() {

        if(this.Bballe.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.Bballe.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.initKeyboard();
    }
}

