import {Personnage,cultRef} from './persoClass.js';
import {creationDiv,editPersonnage,readData,keyG,listPersoBDD} from './functionBDD.js';


let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.offsetWidth;
let y = canvas.offsetHeight;

let i = new Personnage('surcris');




function cercle(ctx,rayon,color) {
    ctx.beginPath();
    ctx.arc(x/2, y/2, rayon, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    //ctx.stroke();
    ctx.fill();
}

let progress = 0
function progressBar() {

    requestAnimationFrame(progressBar)
    ctx.beginPath();


    ctx.fillRect(x*0.2,y*0.9,progress,10);

    //ctx.fillRect(x*0.15,y*0.9,progress,10);

    if (progress>= x*0.6) {
        ctx.clearRect(x*0.21,y*0.89,x*0.6,15);
        progress=0;
        i.levelUp();
        //i.display();
        //editPersonnage(i);
    }
    progress+=0.5;


}

function carre(ctx,rayon) {
    ctx.beginPath();
    ctx.strokeRect(x/2-rayon/2, y/2-rayon/2, rayon, rayon);
    ctx.stroke();

}
function carreRotate(ctx,rayon) {
    ctx.beginPath();
    //ctx.translate(x/2-rayon/2, y/2-rayon/2);
    //ctx.rotate(Math.PI / 2);
    ctx.strokeRect(x/2-rayon/2, y/2-rayon/2, rayon, rayon);

    ctx.stroke();

}

function pointe(ctx,rayon,color) {
    ctx.beginPath();
    ctx.moveTo(x/2-rayon, y/2);
    ctx.lineTo(x/2-rayon, y/2-(rayon-50 ));
    ctx.fillStyle = color;
    ctx.lineTo(x/2+rayon, y/2-(rayon-50 ));
    ctx.lineTo(x/2+rayon, y/2);
    ctx.fill();
    progressBar(ctx);
    //ctx.stroke();
}

//================MAIN===================

function draw() {
    creationDiv();
    pointe(ctx,100,'rgb(211, 84, 0)')
    cercle(ctx,100,'#2c343f');
    cercle(ctx,80,'rgb(211, 84, 0)');
    //carreRotate(ctx,200)
    //requestAnimationFrame(progressBar)

}


draw();