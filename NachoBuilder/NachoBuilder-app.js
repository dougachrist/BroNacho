// var userToppingsArray = [];
var presetUsers = ['Doug','Dylan','Sean','Kaylyn','Sam','Nick','Brian','Nadia'];
var bestMatch = '';
var bestMatchPic = '';
var allUsersObjectArray = [];
var allUsersObjectArrayOrdered = [];
var top3BroNachosObjArray = [];
var bottom3BroNachosObjArray = [];

function NachoBuilder(userName,filePath,ingred1,ingred2,ingred3,ingred4,ingred5,ingred6,ingred7,ingred8,ingred9,ingred10,ingred11,ingred12) {
  this.userName = userName;
  this.filePath = filePath;
  this.rice = ingred1;
  this.beans = ingred2;
  this.chicken = ingred3;
  this.onions = ingred4;
  this.jalapenos = ingred5;
  this.corn = ingred6;
  this.salsa = ingred7;
  this.sourCream = ingred8;
  this.guac = ingred9;
  this.olives = ingred10;
  this.cilantro = ingred11;
  this.beer = ingred12;
  allUsersObjectArray.push(this);
  this.userToppingsArray = [ingred1,ingred2,ingred3,ingred4,ingred5,ingred6,ingred7,ingred8,ingred9,ingred10,ingred11,ingred12];
  this.matchesWithNewUser = 0;
}

Doug = new NachoBuilder('Doug','../imgs/doug.jpg',true,false,false,false,true,false,false,true,true,false,true,false);
Dylan = new NachoBuilder('Dylan','../imgs/dylan.jpeg',false,true,false,false,true,true,false,false,true,true,false,false);
Sean = new NachoBuilder('Sean','../imgs/sean.jpg',false,false,true,false,true,true,false,false,false,true,true,false);
Kaylyn = new NachoBuilder('Kaylyn','../imgs/kaylyn.jpeg',false,false,false,true,false,false,false,true,false,true,true,true);
Sam = new NachoBuilder('Sam','../imgs/sam.jpeg',true,true,true,true,false,false,false,false,true,true,true,false);
Nick = new NachoBuilder('Nick','../imgs/nick.jpg',false,true,true,false,true,true,true,false,false,true,false,true);
Brian = new NachoBuilder('Brian','../imgs/brian.jpg',false,false,true,true,false,true,true,false,false,false,false,false);
Nadia = new NachoBuilder('Nadia','../imgs/nadia.jpg',true,false,true,false,true,false,false,true,true,true,false,false);

var form = document.getElementById('nachoForm');
form.addEventListener('submit', startBroNacho);

function startBroNacho() {
  event.preventDefault();

  var ingred1 = document.getElementById('rice').checked;
  var ingred2 = document.getElementById('beans').checked;
  var ingred3 = document.getElementById('chicken').checked;
  var ingred4 = document.getElementById('onions').checked;
  var ingred5 = document.getElementById('jalapenos').checked;
  var ingred6 = document.getElementById('corn').checked;
  var ingred7 = document.getElementById('salsa').checked;
  var ingred8 = document.getElementById('sourCream').checked;
  var ingred9 = document.getElementById('guac').checked;
  var ingred10 = document.getElementById('olives').checked;
  var ingred11 = document.getElementById('cilantro').checked;
  var ingred12 = document.getElementById('beer').checked;
  var userName = document.getElementById('userNameInput');

  newUser = new NachoBuilder(userName.value,ingred1,ingred2,ingred3,ingred4,ingred5,ingred6,ingred7,ingred8,ingred9,ingred10,ingred11,ingred12);

  compareToEachUser();
  console.log(bestMatch + ' is your BroNacho');
  document.getElementById('broNachoPic').setAttribute('src', bestMatchPic);
  var elP = document.getElementById('broNachoOutput');
  elP.textContent = bestMatch + ' is your BroNacho';

  localStorage.setItem('top3BroNachos',JSON.stringify(top3BroNachosObjArray));
  localStorage.setItem('bottom3BroNachos',JSON.stringify(bottom3BroNachosObjArray));

  window.open('../results/results.html');

// console log all scores
  for( var i = 0; i < allUsersObjectArrayOrdered.length - 1; i++){
    console.log(allUsersObjectArrayOrdered[i].userName + ' ' + allUsersObjectArrayOrdered[i].matchesWithNewUser);
  }

}

function compareToEachUser() {

  var last = allUsersObjectArray.length - 1;
  var counter = 0;

  for(var i = 0; i < allUsersObjectArray.length - 1; i++) {
    for(var j = 0; j < allUsersObjectArray[i].userToppingsArray.length; j++) {
      if(allUsersObjectArray[i].userToppingsArray[j] === allUsersObjectArray[last].userToppingsArray[j] && (allUsersObjectArray[last].userToppingsArray[j] === true)) {
        counter = counter + 2;
      }
      if(allUsersObjectArray[i].userToppingsArray[j] === allUsersObjectArray[last].userToppingsArray[j] && (allUsersObjectArray[last].userToppingsArray[j] === false)) {
        counter = counter + 1;
      }
    }
    allUsersObjectArray[i].matchesWithNewUser = counter;
    counter = 0;
  }

  findBestMatch();
}

function findBestMatch() {

  allUsersObjectArrayOrdered = allUsersObjectArrayOrdered.concat(allUsersObjectArray);

  for(var f = 0; f < (allUsersObjectArrayOrdered.length - 2); f++) {
    var g = f + 1;
    if(allUsersObjectArrayOrdered[g].matchesWithNewUser > allUsersObjectArrayOrdered[f].matchesWithNewUser) {
      var toFront = allUsersObjectArrayOrdered[g];
      allUsersObjectArrayOrdered.splice(g,1);
      allUsersObjectArrayOrdered.unshift(toFront);
      f = -1;
    }
  }

  var last = allUsersObjectArrayOrdered.length - 1;

  bestMatch = allUsersObjectArrayOrdered[0].userName;
  bestMatchPic = allUsersObjectArrayOrdered[0].filePath;
  top3BroNachosObjArray = [allUsersObjectArrayOrdered[0],allUsersObjectArrayOrdered[1],allUsersObjectArrayOrdered[2]];
  bottom3BroNachosObjArray = [allUsersObjectArrayOrdered[last],allUsersObjectArrayOrdered[last - 1],allUsersObjectArrayOrdered[last - 2]];
  return bestMatch;
}
