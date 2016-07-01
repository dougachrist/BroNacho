var userToppingsArray = [];

var dougsToppingsArray = [true,0,0,0];
var dylansToppingsArray = [0,true,0,0];
var seansToppingsArray = [0,0,true,0];
var KaylynToppingsArray = [0,0,0,true];
var allUsers = ['Doug','Dylan','Sean','Kaylyn'];
var bestMatch = '';

var counter = 0;
var userMatches = [];

var allUsersArray = [dougsToppingsArray, dylansToppingsArray, seansToppingsArray, KaylynToppingsArray];

var userName = '';

var form = document.getElementById('nachoForm');
form.addEventListener('submit', somefunction);

function somefunction() {
  event.preventDefault();
  var a = document.getElementById('guac').checked;
  var b = document.getElementById('sourCream').checked;
  var c = document.getElementById('salsa').checked;
  var d = document.getElementById('cilantro').checked;

  userToppingsArray.push(a);
  userToppingsArray.push(b);
  userToppingsArray.push(c);
  userToppingsArray.push(d);

  console.log(userToppingsArray);

  console.log('guac: ', a);
  console.log('sourCream: ', b);
  console.log('salsa: ', c);
  console.log('cilantro: ', d);
  comparison();
  console.log(bestMatch + ' is your BroNacho');
};

function comparison() {

  for(var i = 0; i < allUsersArray.length; i++) {
    for(var j = 0; j < userToppingsArray.length; j++) {
      if(userToppingsArray[j] === allUsersArray[i][j]) {
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
      bestMatch = allUsers[i];
    }
  }
  console.log(p);
  console.log(bestMatch);
  return bestMatch;
}
