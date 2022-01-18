
class Tableau extends Phaser.Scene {
    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('cercle', 'assets/cercle.png');
        this.load.image('carre', 'assets/carre.png');
        this.load.image('raquette', 'assets/raquette.png');

        this.load.audio('applause', 'assets/son/applause.mp3')


    }


    create() {
        this.hauteur=500;
        this.largeur=1000;

        //Son
        this.applause= this.sound.add('applause', {loop: false});
        this.applause.volume = 2

        //Fond
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        //Balle
        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.setVelocityX(Phaser.Math.Between(-200,200));
        this.balle.setVelocityY(Phaser.Math.Between(50,100));
        this.balle.body.setMaxVelocityX(300);
        this.balle.body.setMaxVelocityY(400);
        this.balle.body.setAllowGravity(false)

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

        //Raquettes balle/murs
        this.gauche = this.physics.add.sprite(25, 200,'raquette').setOrigin(0, 0);
        this.gauche.setVelocityY(0);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droite = this.physics.add.sprite(955, 200,'raquette').setOrigin(0, 0);
        this.droite.setVelocityY(0);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        let me = this;
        //Collision raquettes/balle
        this.physics.add.collider(this.balle,this.gauche, function(){
            console.log("touche gauche");
            me.rebond(me.gauche);
        });

        this.physics.add.collider(this.balle,this.gauche);

        this.physics.add.collider(this.balle,this.droite, function(){
            console.log("touche droit");
            me.rebond(me.droite);
        });

        this.physics.add.collider(this.balle,this.droite);

        this.joueurGauche = new Joueur('Jean-Mi','joueurGauche');
        this.joueurDroite = new Joueur('Gyselle','joueurDroite');
        console.log(this.joueurGauche);

        this.balleAucentre();

        this.initKeyboard();
    }





    rebond(raquette){


        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.balle.setVelocityX(0)

        this.balle.setVelocityX(Math.random()>0.5?-100:100)
        this.balle.setVelocityY(0)
    }

    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(0);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    if (me.gauche.y<me.haut.y + 20){
                        me.gauche.setVelocityY(0)
                    }
                    else{
                        me.gauche.setVelocityY(-300);
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    if (me.droite.y<me.haut.y + 20){
                        me.droite.setVelocityY(0)
                    }
                    else{
                        me.droite.setVelocityY(-300);
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    if (me.gauche.y+100>me.bas.y){
                        me.gauche.setVelocityY(0)
                    }
                    else {
                        me.gauche.setVelocityY(300);
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    if (me.droite.y+100>me.bas.y){
                        me.droite.setVelocityY(0)
                    }
                    else {
                        me.droite.setVelocityY(300);
                    }
                    break;
            }
        })
    }
    update() {
        this.applause.play()
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
    }
}

