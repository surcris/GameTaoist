import {cultRef} from './persoClass.js';


let keyG = [];
let listPersoBDD;

 function readData () {
    //cultRef.on('value',(snap) == chaque fois une 'value' est modifier je fais cette instruction
    
    cultRef.on('value',(snap)=>{
        snap.forEach(childSnap => {

            let key = childSnap.key;
            keyG.push(key);
            
            //listPersoBDD = childSnap.val() 
            
            
        })
        
        //addElement();
        //creationDiv();
    })
    //console.log("readData");
    
}
//readData();
function getData() {
    let containerStats = document.getElementById(`div-stats`);
    let database = firebase.database();
    
    return new Promise((resolve, reject) => {
        
        cultRef.on('value', (snapshot) => {
            snapshot.forEach(childSnap => {

                let key = childSnap.key;
                keyG.push(key);
                
                listPersoBDD = childSnap.val() 
                
                
            })
            console.log("readData");
            listPersoBDD = snapshot.val();
            //console.log(listPersoBDD);
            creationDiv(listPersoBDD[keyG[0]]);

        resolve(snapshot.val());
      });
    });

}



getData();
function creationDiv(tab) {
    
    
    //console.log(listPersoBDD[keyG[0]]);
    let containerStats = document.getElementById('div-stats');
    containerStats.innerHTML = '';
    // for(let key in listPersoBDD) {
    //     creationDivValue(containerStats,key,listPersoBDD[key])
    //     
    // }

    for(let key in tab) {
        //console.log(key, l_listPersoBDD[key]);
        if (key == 'nom' || key =='niveau' || key =='xp') {
            creationDivValue(containerStats,key,tab[key])
        }
    }
    for(let key in tab) {
        //console.log(key, listPersoBDD[key]);
        if (key == 'air' || key =='eau' || key =='feu' || key =='terre') {
            creationDivValue(containerStats,key,tab[key])
        }
    }
    for(let key in tab){
        if (key == 'dommage' || key =='puissance') {
            creationDivValue(containerStats,key,tab[key])
        }
    }
    for(let key in tab){
        if (key == 'resAir' || key =='resEau' || key =='resFeu' || key =='resTerre') {
            creationDivValue(containerStats,key,tab[key])
        }
    }
    
    let divStatsPart = document.querySelectorAll('.stats-player div');

}
creationDiv();
function creationDivValue(parent,key,value) {
    
    let divStat = document.createElement('div');
    divStat.setAttribute('class','stats-player');

    let divNomStat = document.createElement('div');
    let divValueStat = document.createElement('div');
    let divBtnStat = document.createElement('button');

    parent.append(divStat);

    if (key == 'air' || key =='eau' || key =='feu' || key =='terre'){

        divValueStat.setAttribute('att',key);
        divNomStat.innerText = key;
        divValueStat.innerText = value;
        divBtnStat.innerText = '+';

        divStat.append(divNomStat);
        divStat.append(divValueStat);
        divStat.append(divBtnStat);
    }else{
        divValueStat.setAttribute('att',key);
        divNomStat.innerText = key;
        divValueStat.innerText = value;

        divStat.append(divNomStat);
        divStat.append(divValueStat);
        
    }
    
}

function updateAffichage() {
    const valueUpdate = document.getElementById(`card-stats`);
    console.log(valueUpdate);
}
//updateAffichage()


function editPersonnage(perso) {
    let tab = [];
    tab[keyG[0]] = perso;
    cultRef.set(tab);
    //console.log(tab);
    //console.log(Object.keys(listPersoBDD)[0])
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