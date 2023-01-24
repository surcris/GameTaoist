const firebaseConfig = {
    apiKey: "AIzaSyB0eACgFpHH2tPQmtU0AroUIa7BYLHiweY",
    authDomain: "fir-fb-ad6f3.firebaseapp.com",
    projectId: "fir-fb-ad6f3",
    storageBucket: "fir-fb-ad6f3.appspot.com",
    messagingSenderId: "646012628556",
    appId: "1:646012628556:web:c258218d46987671708ee9",
    measurementId: "G-426FYD95SH"
};

firebase.initializeApp(firebaseConfig);
//! référence à notre base de donnée
const dbRef = firebase.database().ref();
//! référence à notre noeud de la table users si elle existe pas il l'a créera
const usersRef = dbRef.child('users');
const tableRef = dbRef.child('table');
const cultRef = dbRef.child('cultivation');

export {cultRef};
function selectTable() {

    return cultRef;
    
}
//selectTable();

function readUsersData() {
    let userListUI = document.querySelector('#user-list');
    //! fonction on() agit comme un addListener(), le param 'value' pour indiquer chaque changement
    //! de valeur.
    usersRef.on('value',(snap)=>{
        userListUI.innerHTML = '';
        snap.forEach(childSnap => {

            let key = childSnap.key;
            let value = childSnap.val();
            console.log(key)
            let li = document.createElement('li');

            let editIconUI = document.createElement("span");
            editIconUI.class = "edit-user";
            editIconUI.innerHTML = " ✏️";
            //* Sur les icone en face du nom du user on rajoute un attribut qui contient la key
            editIconUI.setAttribute("userid", key);
            editIconUI.addEventListener("click", editButtonClicked)

            let deleteIconUI = document.createElement('span');
            deleteIconUI.class = 'delete-user';
            deleteIconUI.innerText = "❌";
            deleteIconUI.setAttribute('userid',key);
            deleteIconUI.addEventListener('click', deleteButtonClicked);

            li.setAttribute('user-key',key);
            li.innerHTML = value.name;
            
            li.addEventListener('click',userClicked);
            li.append(deleteIconUI);
            li.append(editIconUI);
            userListUI.append(li);
        })
    })
}
readUsersData();

function userClicked(event) {
    let userID = event.target.getAttribute("user-key");
    //! obtenir l'addresse vers un user "addressedelaBDD/user/0" exemple
    const userRef = dbRef.child('users/' + userID);

    const userDetailUI = document.querySelector('#user-detail');
    userRef.on("value", (snap) =>{ 
        userDetailUI.innerHTML = '';
        snap.forEach(childSnap => {
            const p = document.createElement('p');
            p.innerHTML = childSnap.key+" : "+ childSnap.val();
            userDetailUI.append(p);
        })
    })


}

const btnAdd = document.querySelector('#add-user-btn');
btnAdd.addEventListener('click',addBtnClicked);


function addBtnClicked() {
    
    const addUserInputsUI = document.querySelectorAll('#leFormulaireAjout input');
    let newUser = [];
    for (let index = 0; index < addUserInputsUI.length; index++) {
        addUserInputsUI[index];
        let key = addUserInputsUI[index].getAttribute('data-key');
        let value = addUserInputsUI[index].value;

        newUser[key] = value ;
        console.log(newUser);
    }
    usersRef.push(newUser);
    console.log("Nouvelle utilisateur enregistrer");
    //console.log(newUser);
    const formulaire = document.querySelector('#leFormulaireAjout');
    formulaire.reset();

}

function deleteButtonClicked(event) {
    let userID = event.target.getAttribute("userid");
    const userRef = dbRef.child('users/' + userID);
    console.log(userID);
    userRef.remove();
}

function addNewTable(table) {

    dbRef.push(table);

}

function addInNewTable() {
    let newUser = [];
    newUser['nom'] = "pat"
    tableRef.push(newUser);

}
//addInNewTable();
//addNewTable('table') ;
stripe.onclick = function() {
    stripe.classList.add('animate');
  };

function editButtonClicked (event) {
    let editBtn = document.querySelector('#edit-user-module');
    editBtn.style.display = "block";
    document.querySelector(".edit-userid").value = event.target.getAttribute("userid");
    const editUserInputsUI = document.querySelectorAll(".edit-user-input")
    let userID = event.target.getAttribute("userid");
    const userRef = dbRef.child('users/' + userID);
    
    userRef.on("value", snap => {
        for (let index = 0; index < editUserInputsUI.length; index++) {
            
            let key = editUserInputsUI[index].getAttribute("data-key");
            
            editUserInputsUI[index].value = snap.val()[key]
        }
    })
    let saveBtn = document.querySelector('#edit-user-btn');
    saveBtn.addEventListener('click',saveUserBtnClicked);
    //let saveBtn = document.querySelector('#edit-user-btn')
    
}

function saveUserBtnClicked() {
    let editBtn = document.querySelector('#edit-user-module');
    const userID = document.querySelector('.edit-userid').value;
    const userRef = dbRef.child('users/' + userID);
    const editedUserObject = [];
    const editUserInputsUI = document.querySelectorAll('.edit-user-input');
    
    editUserInputsUI.forEach(textField =>{
        let key = textField.getAttribute("data-key");
        console.log(key);
        editedUserObject[key] = textField.value;
    })
    userRef.set(editedUserObject);
    editBtn.style.display = "none";
}



