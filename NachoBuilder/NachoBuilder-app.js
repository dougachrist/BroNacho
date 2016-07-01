var userToppingsArray = [];
var presetUsers = ['Doug','Dylan','Sean','Kaylyn'];
var bestMatch = '';
var userMatches = [];
var allUsersObjectArray = [];

function NachoBuilder(userName,a,b,c,d) {
  this.userName = userName;
  this.guac = a;
  this.sourCream = b;
  this.salsa = c;
  this.cilantro = d;
  allUsersObjectArray.push(this);
  this.userToppingsArray = [a,b,c,d];
}

Doug = new NachoBuilder('Doug',true,0,0,0);
Dylan = new NachoBuilder('Dylan',0,true,0,0);
Sean = new NachoBuilder('Sean',0,0,true,0);
Kaylyn = new NachoBuilder('Kaylyn',0,0,0,true);

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
    userMatches.push(counter);
    counter = 0;
  }
  console.log(userMatches);
  findBestMatch();
}

function findBestMatch() {
  var p = 0;
  for(var i = 0; i < userMatches.length; i++) {
    if(userMatches[i] > p) {
      p = userMatches[i];
      bestMatch = allUsersObjectArray[i].userName;
    }
  }
  console.log(p);
  console.log(bestMatch);
  return bestMatch;
}
