// Preset names of users and ingredients in arrays
var presetUsers = ['Doug','Dylan','Sean','Kaylyn','Sam','Nick','Brian','Nadia'];
var ingredientNamesArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer', 'beef', 'cheddar', 'greenSalsa', 'picoDeGallo'];

var form = document.getElementById('nachoForm');
var userName = document.getElementById('userNameInput');
var updateList = document.getElementById('ingredientListInBuilder');
var bestMatch = '';
var bestMatchPic = '';

// Array listing all hard-coded instances of bros (and new user is pushed into allUsers on form submit)
var allUsers = []; // Array that stores all 8 present instances of users and the new user that builds their nachos
var allUsersRanked = []; // Same array as allUsers but organized by 'match' score (highest match to lowest match)

var top3Bros = []; // Array that shows top three bros by match score
var bottom3Bros = []; // Array that shows bottm three bros by match score

var ingredientObjArray = []; // Detailed list of all ingredient objects, including name, failpath

// Arrays being used when user is building their nachos
var selectedIngredients = []; // Array containing list of ingredients selected by user during nacho build process
var userIngredients = []; // Array listing user ingredients as booleans in relation to ingredientsArray (e.g true, false, true... if user chose rice and chicken but not beans)

// assemble ingredient objects and add event listeners to all images
function addIngredients () {
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    var currentIngredient = document.getElementById(ingredientNamesArray[i]);
    ingredientObjArray.push(currentIngredient);
    document.getElementById(ingredientNamesArray[i] + 'Photo').addEventListener('click', handleImageSelection);
  };
};
addIngredients();

// Handler for image click
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

// on page load check for local storage and repopulate page with stored data if present
window.onload = function () {
  if (JSON.parse(localStorage.getItem('selectedIngredients') != null)) {
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
};

// Constructor function to build a new user and push it into allUsers
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

// all hard coded instances of bros
Doug = new UserBuilder('Doug','../imgs/profile-imgs/doug.jpg',[true,false,false,false,true,false,false,true,true,false,true,false,true,true,true,true]);
Dylan = new UserBuilder('Dylan','../imgs/profile-imgs/dylan.jpg',[false,true,false,false,true,true,false,false,true,true,false,false,false,true,true,true]);
Sean = new UserBuilder('Sean','../imgs/profile-imgs/sean.jpg',[false,false,true,false,true,true,false,false,false,true,true,false,false,false,true,true]);
Kaylyn = new UserBuilder('Kaylyn','../imgs/profile-imgs/kaylyn.jpg',[false,false,false,true,false,false,false,true,false,true,true,true,false,false,false,true]);
Sam = new UserBuilder('Sam','../imgs/profile-imgs/sam.jpeg',[true,true,true,true,false,false,false,false,true,true,true,false,false,false,false,false]);
Nick = new UserBuilder('Nick','../imgs/profile-imgs/nick.jpg',[false,true,true,false,true,true,true,false,false,true,false,true,true,false,true,true]);
Brian = new UserBuilder('Brian','../imgs/profile-imgs/brian.jpg',[false,false,true,true,false,true,true,false,false,false,false,false,true,false,false,true]);
Nadia = new UserBuilder('Nadia','../imgs/profile-imgs/nadia.jpg',[true,false,true,false,true,false,false,true,true,true,false,false,true,false,false,false]);

form.addEventListener('submit', handleNachoSubmit);

function showButton() {
  if (selectedIngredients.length > 4) {
    var submitButton = document.getElementById('submitButton');
    submitButton.className = '';
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
  endOfList.className = '';
}

function setupNewUser() {
  for (var i = 0; i < ingredientNamesArray.length; i++) {
    for (j = 0; j < selectedIngredients.length; j++) {
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
  newUser = new UserBuilder(userName.value,'', userIngredients);

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

  bestMatch = allUsersRanked[0].userName;
  bestMatchPic = allUsersRanked[0].filePath;
  top3Bros = [allUsersRanked[0], allUsersRanked[1], allUsersRanked[2]];
  bottom3Bros = [allUsersRanked[last], allUsersRanked[last - 1], allUsersRanked[last - 2]];
}

function redirectToResults() {
  window.location.href = '../html/results.html';
}
