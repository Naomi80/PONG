class Joueur {
    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.$score.textContent=  this._score
        console.log(this)
    }
    constructor(name,scoreId,Tableau,x) {

        this.Tableau2= Tableau
        this._score = 0;
        this.name = name;
        this.scoreId = scoreId;

        this.raquette=this.Tableau2.physics.add.sprite(x,310,'raquette').setOrigin(0.0)
        this.raquette.body.setSize(20,100)
        this.raquette.setImmovable(true)
        this.raquette.setVelocityY(0)
        this.raquette.body.setAllowGravity(false);

        let me=this
        this.Tableau2.physics.add.collider(this.raquette, this.Tableau2.Bballe.balle, function () {
            me.Tableau2.rebond(me.raquette)
        })


        this.$el = document.getElementById(scoreId);
        this.$score = this.$el.querySelector(".score")
        this.$name = this.$el.querySelector(".name")
        this.$name.textContent=name;

    }
}