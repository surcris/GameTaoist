import {cultRef} from './persoClass.js';


let keyG = [];
let listPersoBDD;

function readData () {
    //cultRef.on('value',(snap) == chaque fois une 'value' est modifier je fais cette instruction
    
    cultRef.on('value',(snap)=>{
        snap.forEach(childSnap => {

            let key = childSnap.key;
            keyG.push(key);
            
            listPersoBDD = childSnap.val() 
            //console.log(listPersoBDD);

        })
        //addElement();
        creationDiv();
    })
    
    return listPersoBDD;
}

console.log(readData()); // le return est undefined

function creationDiv() {

   
    let containerStats = document.querySelector('#div-stats');
    
    // for(let key in listPersoBDD) {
    //     creationDivValue(containerStats,key,listPersoBDD[key])
    //     
    // }

    for(let key in listPersoBDD) {
        console.log(key, listPersoBDD[key]);
        if (key == 'nom' || key =='niveau' || key =='xp') {
            creationDivValue(containerStats,key,listPersoBDD[key])
        }
    }
    for(let key in listPersoBDD) {
        //console.log(key, listPersoBDD[key]);
        if (key == 'air' || key =='eau' || key =='feu' || key =='terre') {
            creationDivValue(containerStats,key,listPersoBDD[key])
        }
    }
    for(let key in listPersoBDD){
        if (key == 'dommage' || key =='puissance') {
            creationDivValue(containerStats,key,listPersoBDD[key])
        }
    }
    for(let key in listPersoBDD){
        if (key == 'resAir' || key =='resEau' || key =='resFeu' || key =='resTerre') {
            creationDivValue(containerStats,key,listPersoBDD[key])
        }
    }
    
    let divStatsPart = document.querySelectorAll('.stats-player div');

}

function creationDivValue(parent,key,value) {
    let divStat = document.createElement('div');
    divStat.setAttribute('class','stats-player');

    let divNomStat = document.createElement('div');
    let divValueStat = document.createElement('div');
    let divBtnStat = document.createElement('button');

    parent.append(divStat);

    if (key == 'air' || key =='eau' || key =='feu' || key =='terre'){
        divNomStat.innerText = key;
        divValueStat.innerText = value;
        divBtnStat.innerText = '+';

        divStat.append(divNomStat);
        divStat.append(divValueStat);
        divStat.append(divBtnStat);
    }else{
        divNomStat.innerText = key;
        divValueStat.innerText = value;

        divStat.append(divNomStat);
        divStat.append(divValueStat);
        
    }
    
}



async function editPersonnage(perso) {
    let tab = [];
    tab[keyG] = perso;
    //cultRef.set(tab);
    console.log(tab);
    
}
function addElement() {
    let tab = { exeep:0 };
    const vel = cultRef.child(keyG[0]);
   
    //update(vel, updates);
    vel.update(tab)
    console.log('add');
    
}

// const initialState  = async () => {
//     try {
//         const contacts = await readData();
//         console.log(contacts);
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   initialState();


export {creationDiv,editPersonnage,readData,keyG,listPersoBDD}