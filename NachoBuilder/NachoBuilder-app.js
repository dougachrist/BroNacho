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

Doug = new NachoBuilder('Doug',true,false,false,false,true,false,false,true,true,false,true,false);
Dylan = new NachoBuilder('Dylan',false,true,false,false,true,true,false,false,true,true,false,false);
Sean = new NachoBuilder('Sean',false,false,true,false,true,true,false,false,false,true,true,false);
Kaylyn = new NachoBuilder('Kaylyn',false,false,false,true,false,false,false,true,false,true,true,true);
Sam = new NachoBuilder('Sam',true,true,true,true,false,false,false,false,true,true,true,false);
Nick = new NachoBuilder('Nick',false,true,true,false,true,true,true,false,false,true,false,true);
Brian = new NachoBuilder('Brian',false,false,true,true,false,true,true,false,false,false,false,false);
Nadia = new NachoBuilder('Nadia',true,false,true,false,true,false,false,true,true,true,false,false);

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
  var elP = document.getElementById('broNachoOutput');
  elP.textContent = bestMatch + ' is your BroNacho';
  window.open('../results.html');

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
