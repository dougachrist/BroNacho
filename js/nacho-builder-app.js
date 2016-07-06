// Preset names of users and ingredients in arrays
var presetUsers = ['Doug','Dylan','Sean','Kaylyn','Sam','Nick','Brian','Nadia'];
var ingredientNamesArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer'];

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

// assemble ingredient objects and add event listeners
function addIngredients () {
  for(var i = 0; i < ingredientNamesArray.length; i++) {
    var currentIngredient = document.getElementById(ingredientNamesArray[i]);
    ingredientObjArray.push(currentIngredient);
    document.getElementById(ingredientNamesArray[i] + 'Photo').addEventListener('click', handleImageSelection);
  };
};
addIngredients();

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

// for loop
Doug = new UserBuilder('Doug','../imgs/profile-imgs/doug.jpg',[true,false,false,false,true,false,false,true,true,false,true,false]);
Dylan = new UserBuilder('Dylan','../imgs/profile-imgs/dylan.jpeg',[false,true,false,false,true,true,false,false,true,true,false,false]);
Sean = new UserBuilder('Sean','../imgs/profile-imgs/sean.jpg',[false,false,true,false,true,true,false,false,false,true,true,false]);
Kaylyn = new UserBuilder('Kaylyn','../imgs/profile-imgs/kaylyn.jpeg',[false,false,false,true,false,false,false,true,false,true,true,true]);
Sam = new UserBuilder('Sam','../imgs/profile-imgs/sam.jpeg',[true,true,true,true,false,false,false,false,true,true,true,false]);
Nick = new UserBuilder('Nick','../imgs/profile-imgs/nick.jpg',[false,true,true,false,true,true,true,false,false,true,false,true]);
Brian = new UserBuilder('Brian','../imgs/profile-imgs/brian.jpg',[false,false,true,true,false,true,true,false,false,false,false,false]);
Nadia = new UserBuilder('Nadia','../imgs/profile-imgs/nadia.jpg',[true,false,true,false,true,false,false,true,true,true,false,false]);

form.addEventListener('submit', handleNachoSubmit);

// window.onload = function () {
//   if (JSON.parse(localStorage.getItem('selectedIngredients') != null)) {
//     selectedIngredients = JSON.parse(localStorage.getItem('selectedIngredients'));
//     console.log('localStorage used');
//   }
// };

function handleImageSelection() {
  var alt = document.getElementById(this.alt);
  console.log(alt.id);
  if (this.className === 'inactive') {
    this.className = 'active';
    alt.checked = true;
    selectedIngredients.push(alt.value);
    showIngredients();
    console.log(this.alt + ' has been selected');
  } else {
    this.className = 'inactive';
    alt.checked = false;
    for (var i = 0; i < selectedIngredients.length; i++) {
      if(alt.value === selectedIngredients[i]) {
        selectedIngredients.splice(i,1);
      }
    }
    console.log(this.alt + ' has been unchecked');
  }
  repopulateList();
  showButton();
  console.log(selectedIngredients);
  localStorage.setItem('selectedIngredients',JSON.stringify(selectedIngredients));
}

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
      if(ingredientNamesArray[i] === selectedIngredients[j].value) {
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
  console.log(userIngredients);
  newUser = new UserBuilder(userName.value,'', userIngredients);

  compareToEachUser();
  console.log(bestMatch + ' is your BroNacho');
  document.getElementById('broNachoPic').setAttribute('src', bestMatchPic);
  var elP = document.getElementById('broNachoOutput');
  elP.textContent = bestMatch + ' is your BroNacho';

  localStorage.setItem('top3BroNachos',JSON.stringify(top3Bros));
  localStorage.setItem('bottom3BroNachos',JSON.stringify(bottom3Bros));
  localStorage.setItem('allUsers',JSON.stringify(allUsersRanked));
  selectedIngredients = [];
  localStorage.setItem('selectedIngredients', selectedIngredients);

  window.open('../html/results.html');

// console log all scores
  for( var i = 0; i < allUsersRanked.length - 1; i++){
    console.log(allUsersRanked[i].userName + ' ' + allUsersRanked[i].matchesWithNewUserTally);
  }
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

  findBestMatch();
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
