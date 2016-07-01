var userToppingsArray = [];
var presetUsers = ['Doug','Dylan','Sean','Kaylyn'];
var bestMatch = '';
var allUsersObjectArray = [];
var allUsersObjectArrayOrdered = [];

function NachoBuilder(userName,a,b,c,d) {
  this.userName = userName;
  this.guac = a;
  this.sourCream = b;
  this.salsa = c;
  this.cilantro = d;
  allUsersObjectArray.push(this);
  this.userToppingsArray = [a,b,c,d];
  this.matchesWithNewUser = 0;
}

Doug = new NachoBuilder('Doug',true,false,false,false);
Dylan = new NachoBuilder('Dylan',false,true,false,false);
Sean = new NachoBuilder('Sean',false,false,true,false);
Kaylyn = new NachoBuilder('Kaylyn',false,false,false,true);
Sam = new NachoBuilder('Sam',true,true,true,true);
Nick = new NachoBuilder('Nick',false,true,true,false);
Brian = new NachoBuilder('Brian',false,false,true,true);

var form = document.getElementById('nachoForm');
form.addEventListener('submit', startBroNacho);

function startBroNacho() {
  event.preventDefault();

  var a = document.getElementById('guac').checked;
  var b = document.getElementById('sourCream').checked;
  var c = document.getElementById('salsa').checked;
  var d = document.getElementById('cilantro').checked;
  var userName = document.getElementById('userNameInput');

  newUser = new NachoBuilder(userName.value,a,b,c,d);

  compareToEachUser();
  console.log(bestMatch + ' is your BroNacho');
  var elP = document.getElementById('broNachoOutput');
  elP.textContent = bestMatch + ' is your BroNacho';
}

function compareToEachUser() {

  var last = allUsersObjectArray.length - 1;
  var counter = 0;

  for(var i = 0; i < allUsersObjectArray.length - 1; i++) {
    for(var j = 0; j < allUsersObjectArray[i].userToppingsArray.length; j++) {
      if(allUsersObjectArray[i].userToppingsArray[j] === allUsersObjectArray[last].userToppingsArray[j]) {
        counter ++;
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
  bestMatch = allUsersObjectArrayOrdered[0].userName;
  return bestMatch;
}
