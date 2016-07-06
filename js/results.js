'use strict';

var ingredientsArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer', 'beef', 'cheddar', 'greenSalsa', 'picoDeGallo'];
var top3BroNachosArray = JSON.parse(localStorage.getItem('top3BroNachos'));
var bottom3BroNachosArray = JSON.parse(localStorage.getItem('bottom3BroNachos'));
var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var totalPossible = 0;
var allPercentages = [];
var allGages = ['gauge', 'gauge2', 'gauge3', 'gauge4', 'gauge5', 'gauge6'];

function calculateTotalPossible() {
  var counter = 0;
  for (var i = 0; i < allUsers[8].ingredients.length; i++){
    if (allUsers[8].ingredients[i] === true){
      counter += 2;
    }
    if (allUsers[8].ingredients[i] === false){
      counter += 1;
    }
  }
  totalPossible = counter;
}

calculateTotalPossible();

var ImgEl = document.getElementById('BroNacho1');
ImgEl.setAttribute('src',top3BroNachosArray[0].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('BroNacho1Name');
pEl.textContent = top3BroNachosArray[0].userName;
pEl.className = 'BroName';

var ImgEl = document.getElementById('BroNacho2');
ImgEl.setAttribute('src',top3BroNachosArray[1].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('BroNacho2Name');
pEl.textContent = top3BroNachosArray[1].userName;
pEl.className = 'BroName';

var ImgEl = document.getElementById('BroNacho3');
ImgEl.setAttribute('src',top3BroNachosArray[2].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('BroNacho3Name');
pEl.textContent = top3BroNachosArray[2].userName;
pEl.className = 'BroName';

var ImgEl = document.getElementById('NachoBro1');
ImgEl.setAttribute('src',bottom3BroNachosArray[0].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('NachoBro1Name');
pEl.textContent = bottom3BroNachosArray[0].userName;
pEl.className = 'BroName';

var ImgEl = document.getElementById('NachoBro2');
ImgEl.setAttribute('src',bottom3BroNachosArray[1].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('NachoBro2Name');
pEl.textContent = bottom3BroNachosArray[1].userName;
pEl.className = 'BroName';

var ImgEl = document.getElementById('NachoBro3');
ImgEl.setAttribute('src',bottom3BroNachosArray[2].filePath);
ImgEl.className = 'userImage';
var pEl = document.getElementById('NachoBro3Name');
pEl.textContent = bottom3BroNachosArray[2].userName;
pEl.className = 'BroName';

// var ulEl = document.getElementById('ingredients');
//
// function addMatchedIngredients() {
//   for (var i = 0; i < ingredientsArray.length; i++) {
//     var liEl = document.createElement('li');
//     if(allUsers[8].ingredients[i] === top3BroNachosArray[0].ingredients[i] && allUsers[8].ingredients[i] === true ) {
//       liEl.textContent = ingredientsArray[i];
//       liEl.className = 'matched';
//       ulEl.appendChild(liEl);
//     }
//   }
// }

// function addScore() {
//   var liEl = document.createElement('li');
//   liEl.textContent = 'score: ' + top3BroNachosArray[0].matchesWithNewUserTally;
//   liEl.className = 'score';
//   ulEl.appendChild(liEl);
//   var liEl = document.createElement('li');
//   liEl.textContent = 'out of: ' + totalPossible;
//   liEl.className = 'score';
//   ulEl.appendChild(liEl);
//   var liEl = document.createElement('li');
//   liEl.textContent = 'percentage: ' + (Math.round(((top3BroNachosArray[0].matchesWithNewUserTally) / totalPossible) * 100));
//   liEl.className = 'score';
//   ulEl.appendChild(liEl);
//
// }

// addMatchedIngredients();
// addScore();
function findPercentage () {
  for(var i = 0; i < top3BroNachosArray.length; i++) {
    var percent = (Math.round(((top3BroNachosArray[i].matchesWithNewUserTally) / totalPossible) * 100));
    allPercentages.push(percent);
  }
  for(var i = 0; i < bottom3BroNachosArray.length; i++){
    percent = (Math.round(((bottom3BroNachosArray[i].matchesWithNewUserTally) / totalPossible) * 100));
    allPercentages.push(percent);
  }
};

function populateGage() {
  for(var i = 0; i < allPercentages.length; i++) {
    makeNewGage(allGages[i], allPercentages[i]);
  }
};

function makeNewGage(id,value){
  var g = new JustGage({
    id: id,
    value: value,
    min: 0,
    max: 100,
    title: 'BroNachoMeter'
  });
  return g;
};

findPercentage();
populateGage();
//
// makeNewGage('gauge',75);
// makeNewGage('gauge2',65);
// makeNewGage('gauge3',55);
// makeNewGage('gauge4',35);
// makeNewGage('gauge5',25);
// makeNewGage('gauge6',15);
