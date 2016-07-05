// Preset names of users and ingredients in arrays
var presetUsers = ['Doug','Dylan','Sean','Kaylyn','Sam','Nick','Brian','Nadia'];
var ingredientNamesArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer'];

var bestMatch = '';
var bestMatchPic = '';

var allUsersArray = []; // Array that stores all 8 present instances of users and the new user that builds their nachos
var allUsersRankedArray = []; // Same array as allUsersArray but organized by 'match' score (highest match to lowest match)

var top3BroNachosObjArray = []; // Array that shows top three bros by match score
var bottom3BroNachosObjArray = []; // Array that shows bottm three bros by match score

var ingredientObjArray = []; // Detailed list of all ingredient objects, including name, failpath

// Arrays listing what ingredients are picked by the active user
var userSelectedArray = []; // Array containing list of ingredients selected by user during nacho build process
var ingredientTorFArray = []; // Array listing user ingredients as true/false in relation to ingredientsArray (e.g true, false, true... if user chose rice and chicken but not beans)

// assemble ingredient objects and add event listeners
function addIngredients () {
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    var currentIngredient = document.getElementById(ingredientNamesArray[i]);
    ingredientObjArray.push(currentIngredient);
    document.getElementById(ingredientNamesArray[i] + 'Photo').addEventListener('click', turnGreen);
  };
};
addIngredients();

function NachoBuilder(userName, filePath, ingredientObjArray) {
  this.userName = userName;
  this.filePath = filePath;
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    this[ingredientNamesArray[i]] = ingredientObjArray[i];
  }

  allUsersArray.push(this);
  this.userToppingsArray = ingredientObjArray;
  this.matchesWithNewUser = 0;
}

Doug = new NachoBuilder('Doug','../imgs/profile-imgs/doug.jpg',[true,false,false,false,true,false,false,true,true,false,true,false]);
Dylan = new NachoBuilder('Dylan','../imgs/profile-imgs/dylan.jpeg',[false,true,false,false,true,true,false,false,true,true,false,false]);
Sean = new NachoBuilder('Sean','../imgs/profile-imgs/sean.jpg',[false,false,true,false,true,true,false,false,false,true,true,false]);
Kaylyn = new NachoBuilder('Kaylyn','../imgs/profile-imgs/kaylyn.jpeg',[false,false,false,true,false,false,false,true,false,true,true,true]);
Sam = new NachoBuilder('Sam','../imgs/profile-imgs/sam.jpeg',[true,true,true,true,false,false,false,false,true,true,true,false]);
Nick = new NachoBuilder('Nick','../imgs/profile-imgs/nick.jpg',[false,true,true,false,true,true,true,false,false,true,false,true]);
Brian = new NachoBuilder('Brian','../imgs/profile-imgs/brian.jpg',[false,false,true,true,false,true,true,false,false,false,false,false]);
Nadia = new NachoBuilder('Nadia','../imgs/profile-imgs/nadia.jpg',[true,false,true,false,true,false,false,true,true,true,false,false]);

var form = document.getElementById('nachoForm');
form.addEventListener('submit', startBroNacho);

var userName = document.getElementById('userNameInput');
var updateList = document.getElementById('ingredientListInBuilder');

function turnGreen() {
  if (this.className === 'inactive') {
    this.className = 'active';
    var alt = document.getElementById(this.alt);
    alt.checked = true;
    userSelectedArray.push(alt);
    removeHidden();
    updateList.innerHTML = '';
    for (var i = 0; i < userSelectedArray.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = userSelectedArray[i].value;
      updateList.appendChild(liEl);
    }
    console.log(this.alt + ' has been selected');
  } else {
    this.className = 'inactive';
    document.getElementById(this.alt).checked = false;
    for (var i = 0; i < userSelectedArray.length; i++) {
      if(this.alt === userSelectedArray[i].value) {
        userSelectedArray.splice(i,1);
      }
    }
    updateList.innerHTML = '';
    for (var i = 0; i < userSelectedArray.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = userSelectedArray[i].value;
      updateList.appendChild(liEl);
    }
    console.log(this.alt + ' has been unchecked');
  }
  buttonAppear();
}
function buttonAppear () {
  if (userSelectedArray.length > 4) {
    var submitButton = document.getElementById('submitButton');
    submitButton.className = '';
  }
}

function removeHidden() {
  var endOfList = document.getElementById('endOfSelectedIngredients');
  updateList.className = '';
  endOfList.className = '';
}

function removeFromPreviewFooter() {
  updateList.removeChild('liEl');
}

function setupNewUser() {
  for (var i = 0; i < ingredientNamesArray.length; i++) {
    for (j = 0; j < userSelectedArray.length; j++) {
      if(ingredientNamesArray[i] === userSelectedArray[j].value) {
        ingredientTorFArray[i] = true;
        break;
      } else {
        ingredientTorFArray[i] = false;
      }
    }
  }
}

function startBroNacho() {
  event.preventDefault();

  setupNewUser();
  console.log(ingredientTorFArray);
  newUser = new NachoBuilder(userName.value,'', ingredientTorFArray);

  compareToEachUser();
  console.log(bestMatch + ' is your BroNacho');
  document.getElementById('broNachoPic').setAttribute('src', bestMatchPic);
  var elP = document.getElementById('broNachoOutput');
  elP.textContent = bestMatch + ' is your BroNacho';

  localStorage.setItem('top3BroNachos',JSON.stringify(top3BroNachosObjArray));
  localStorage.setItem('bottom3BroNachos',JSON.stringify(bottom3BroNachosObjArray));
  localStorage.setItem('allUsers',JSON.stringify(allUsersRankedArray));

  window.open('../html/results.html');

// console log all scores
  for( var i = 0; i < allUsersRankedArray.length - 1; i++){
    console.log(allUsersRankedArray[i].userName + ' ' + allUsersRankedArray[i].matchesWithNewUser);
  }
}

function compareToEachUser() {

  var last = allUsersArray.length - 1;
  var counter = 0;

  for(var i = 0; i < allUsersArray.length - 1; i++) {
    for(var j = 0; j < allUsersArray[i].userToppingsArray.length; j++) {
      if(allUsersArray[i].userToppingsArray[j] === allUsersArray[last].userToppingsArray[j] && (allUsersArray[last].userToppingsArray[j] === true)) {
        counter = counter + 2;
      }
      if(allUsersArray[i].userToppingsArray[j] === allUsersArray[last].userToppingsArray[j] && (allUsersArray[last].userToppingsArray[j] === false)) {
        counter = counter + 1;
      }
    }
    allUsersArray[i].matchesWithNewUser = counter;
    counter = 0;
  }

  findBestMatch();
}

function findBestMatch() {

  allUsersRankedArray = allUsersRankedArray.concat(allUsersArray);

  for(var f = 0; f < (allUsersRankedArray.length - 2); f++) {
    var g = f + 1;
    if(allUsersRankedArray[g].matchesWithNewUser > allUsersRankedArray[f].matchesWithNewUser) {
      var toFront = allUsersRankedArray[g];
      allUsersRankedArray.splice(g,1);
      allUsersRankedArray.unshift(toFront);
      f = -1;
    }
  }

  var last = allUsersRankedArray.length - 2;

  bestMatch = allUsersRankedArray[0].userName;
  bestMatchPic = allUsersRankedArray[0].filePath;
  top3BroNachosObjArray = [allUsersRankedArray[0],allUsersRankedArray[1],allUsersRankedArray[2]];
  bottom3BroNachosObjArray = [allUsersRankedArray[last],allUsersRankedArray[last - 1],allUsersRankedArray[last - 2]];
  return bestMatch;
}
