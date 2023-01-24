const firebaseConfig = {
    apiKey: "AIzaSyDBSDqxcpDVzrUEKel3KUvzcUlF8AFkgj0",
    authDomain: "game-e6fea.firebaseapp.com",
    projectId: "game-e6fea",
    storageBucket: "game-e6fea.appspot.com",
    messagingSenderId: "955898014453",
    appId: "1:955898014453:web:367679609055cbff2bb3bc",
    measurementId: "G-KX6M12HL2S"
};

firebase.initializeApp(firebaseConfig);
//! référence à notre base de donnée
const dbRef = firebase.database().ref();
const cultRef = dbRef.child('cultivation');


class Personnage{
    nom;
    niveau;
    eau;
    feu;
    air
    terre;
    puissance;
    dommage;
    degatBrut;
    resEau;
    resFeu;
    resTerre;
    resAir;
    resBrut;
    xp;
    
    constructor(nom){
        this.nom = nom;
        this.niveau = 1;
        this.xp = 0;
        this.eau = 40;
        this.feu = 50;
        this.air = 20;
        this.terre = 30;
        this.puissance = 1;
        this.dommage = 10;
        this.degatBrut =0;
        this.resEau = 5;
        this.resFeu = 5;
        this.resTerre = 5;
        this.resAir = 5;
        this.resBrut = 0;

    }
    display(){
        console.log(this.getNom()," lvl ",this.getNiveau());
    }
    displayDegat(){
        this.degatAir();
        this.degatEau();
        this.degatTerre();
        this.degatFeu();
    }

    getNom(){
        return this.nom;
    }
    getNiveau(){
        return this.niveau;
    }
    setNiveau(niveau){
        this.niveau = niveau;
    }
    levelUp(){
        if (this.xp == this.niveau ) {
            this.niveau += 1;
        }
        
    }

    degatEau(){
        
        this.degatBrut = Math.round((((this.eau+this.puissance+100)/100)*this.dommage));
        console.log("Attaque Eau : ",this.degatBrut);
        return this.degatBrut;
    }
    degatFeu(){
        
        this.degatBrut = Math.round((((this.feu+this.puissance+100)/100)*this.dommage));
        
        console.log("Attaque Feu : ",this.degatBrut);
        return this.degatBrut;
    }
    degatAir(){
        
        this.degatBrut = Math.round((((this.air+this.puissance+100)/100)*this.dommage));
        
        console.log("Attaque Air : ",this.degatBrut);
        return this.degatBrut;
    }
    degatTerre(){
        
        this.degatBrut = Math.round((((this.terre+this.puissance+100)/100)*this.dommage));
        console.log("Attaque Terre : ",this.degatBrut);
        return this.degatBrut;
    }
}



let player = new Personnage('Surcris');

function addPlayer(player) {
   //let perso = [player]
    cultRef.push(player);
    console.log("Nouvelle utilisateur enregistrer");

}

function exp() {
    let lvl = 1;
    let xp = 0;

    for (let index = 0; index < 30; index++) {
        xp = 200*index*(1+index);
        //console.log(xp)
        lvl++;
    }
    
}
exp();
//addPlayer(player);
export {Personnage,cultRef};
