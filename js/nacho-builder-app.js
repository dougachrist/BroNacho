'use strict';
var presetUsers = ['Doug','Dylan','Sean','Kaylyn','Sam','Nick','Brian','Nadia'];
var ingredientNamesArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer', 'beef', 'cheddar', 'greenSalsa', 'picoDeGallo'];

var form = document.getElementById('nachoForm');
var userNameInStorage = localStorage.getItem('userName');
var updateList = document.getElementById('ingredientListInBuilder');
var bestMatch = '';
var bestMatchPic = '';

var allUsers = [];
var allUsersRanked = [];

var top3Bros = [];
var bottom3Bros = [];

var ingredientObjArray = [];
var selectedIngredients = [];
var userIngredients = [];

function addIngredients () {
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    var currentIngredient = document.getElementById(ingredientNamesArray[i]);
    ingredientObjArray.push(currentIngredient);
    document.getElementById(ingredientNamesArray[i] + 'Photo').addEventListener('click', handleImageSelection);
  };
};
addIngredients();

function handleImageSelection() {
  var alt = document.getElementById(this.alt);
  if (this.className === 'inactive') {
    this.className = 'active';
    alt.checked = true;
    selectedIngredients.push(alt.value);
    showIngredients();
  } else {
    this.className = 'inactive';
    alt.checked = false;
    for (var i = 0; i < selectedIngredients.length; i++) {
      if(alt.value === selectedIngredients[i]) {
        selectedIngredients.splice(i,1);
      }
    }
  }
  repopulateList();
  showButton();
  localStorage.setItem('selectedIngredients',JSON.stringify(selectedIngredients));
}

window.onload = function () {
  if (localStorage.getItem('selectedIngredients') != '' && localStorage.getItem('selectedIngredients') != null) {
    selectedIngredients = JSON.parse(localStorage.getItem('selectedIngredients'));
    for(var i = 0; i < selectedIngredients.length; i++) {
      var elImg = document.getElementById(selectedIngredients[i] + 'Photo');
      elImg.className = 'active';
      var elInput = document.getElementById(selectedIngredients[i]);
      elInput.checked = true;
    }
  }
  showIngredients();
  repopulateList();
  showButton();
};

function UserBuilder(userName, filePath, ingredients) {
  this.userName = userName;
  this.filePath = filePath;
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    this[ingredientNamesArray[i]] = ingredients[i];
  }
  allUsers.push(this);
  this.ingredients = ingredients;
  this.matchesWithNewUserTally = 0;
}

var presetUsersIngredients = [[true,false,true,true,true,true,true,false,true,true,true,true,false,true,false,true], //Doug
[false,false,true,true,true,false,true,false,true,true,true,true,true,true,false,true], //Dylan
[true,true,true,false,true,false,false,true,false,true,true,false,false,true,true,true], //Sean
[true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true], //Kaylyn "the works"
[true,true,true,true,false,false,false,false,true,true,true,false,false,false,false,false], //Sam
[false,true,true,false,true,true,true,false,false,true,false,true,true,false,true,true], // Nick
[false,false,true,true,false,true,true,false,false,false,false,false,true,false,false,true], // Brian
[true,false,true,false,true,false,false,true,true,true,false,false,true,false,false,false]]; // Nadia

function buildPresetUsers(presetName,presetUsersIngredients) {
  presetName = new UserBuilder(presetName,'../imgs/profile-imgs/' + presetName + '.jpg', presetUsersIngredients);
}

for (var i = 0; i < presetUsers.length; i++){
  if (userNameInStorage !== presetUsers[i].toLowerCase()){
    buildPresetUsers(presetUsers[i],presetUsersIngredients[i]);
  }
}

form.addEventListener('submit', handleNachoSubmit);

function showButton() {
  if (selectedIngredients.length > 4) {
    var submitButton = document.getElementById('submitButton');
    submitButton.className = '';
  } else {
    var submitButton = document.getElementById('submitButton');
    submitButton.className = 'hidden';
  }
}

function repopulateList() {
  updateList.innerHTML = '';
  for (var i = 0; i < selectedIngredients.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = selectedIngredients[i];
    updateList.appendChild(liEl);
  }
}

function showIngredients() {
  var endOfList = document.getElementById('endOfSelectedIngredients');
  updateList.className = '';
}

function setupNewUser() {
  for (var i = 0; i < ingredientNamesArray.length; i++) {
    for (var j = 0; j < selectedIngredients.length; j++) {
      if(ingredientNamesArray[i] === selectedIngredients[j]) {
        userIngredients[i] = true;
        break;
      } else {
        userIngredients[i] = false;
      }
    }
  }
}

function handleNachoSubmit(event) {
  event.preventDefault();

  setupNewUser();
  var newUser = new UserBuilder(userNameInStorage,'', userIngredients);

  compareToEachUser();
  findBestMatch();

  localStorage.setItem('top3BroNachos',JSON.stringify(top3Bros));
  localStorage.setItem('bottom3BroNachos',JSON.stringify(bottom3Bros));
  localStorage.setItem('allUsers',JSON.stringify(allUsersRanked));
  selectedIngredients = [];
  localStorage.setItem('selectedIngredients', selectedIngredients);

  redirectToResults();
}

function compareToEachUser() {
  var last = allUsers.length - 1;
  var counter = 0;
  for(var i = 0; i < allUsers.length - 1; i++) {
    for(var j = 0; j < allUsers[i].ingredients.length; j++) {
      if(allUsers[i].ingredients[j] === allUsers[last].ingredients[j] && (allUsers[last].ingredients[j] === true)) {
        counter += 2;
      }
      if(allUsers[i].ingredients[j] === allUsers[last].ingredients[j] && (allUsers[last].ingredients[j] === false)) {
        counter += 1;
      }
    }
    allUsers[i].matchesWithNewUserTally = counter;
    counter = 0;
  }
}

function findBestMatch() {
  allUsersRanked = allUsersRanked.concat(allUsers);
  for(var f = 0; f < (allUsersRanked.length - 2); f++) {
    if(allUsersRanked[f + 1].matchesWithNewUserTally > allUsersRanked[f].matchesWithNewUserTally) {
      var toFront = allUsersRanked[f + 1];
      allUsersRanked.splice(f + 1, 1);
      allUsersRanked.unshift(toFront);
      f = -1;
    }
  }
  var last = allUsersRanked.length - 2;
  top3Bros = [allUsersRanked[0], allUsersRanked[1], allUsersRanked[2]];
  bottom3Bros = [allUsersRanked[last], allUsersRanked[last - 1], allUsersRanked[last - 2]];
}

function redirectToResults() {
  window.location.href = '../html/results.html';
}
