'use strict';

var ingredientsArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer', 'beef', 'cheddar', 'greenSalsa', 'picoDeGallo'];
var top3BroNachosArray = JSON.parse(localStorage.getItem('top3BroNachos'));
var bottom3BroNachosArray = JSON.parse(localStorage.getItem('bottom3BroNachos'));
var allUsers = JSON.parse(localStorage.getItem('allUsers'));
var totalPossible = 0;
var allPercentages = [];
var allGages = ['gauge', 'gauge2', 'gauge3', 'gauge4', 'gauge5', 'gauge6'];
var broNachoIds = ['BroNacho1','BroNacho2','BroNacho3'];
var nachoBroIds = ['NachoBro1','NachoBro2','NachoBro3'];
var broNachoNames = ['BroNacho1Name','BroNacho2Name','BroNacho3Name'];
var nachoBroNames = ['NachoBro1Name','NachoBro2Name','NachoBro3Name'];

function calculateTotalPossible() {
  var last = allUsers.length - 1;
  var counter = 0;
  for (var i = 0; i < allUsers[last].ingredients.length; i++){
    if (allUsers[last].ingredients[i] === true){
      counter += 2;
    }
    if (allUsers[last].ingredients[i] === false){
      counter += 1;
    }
  }
  totalPossible = counter;
}

function setupResults (id, nameId, filePath, userName) {
  var ImgEl = document.getElementById(id);
  ImgEl.setAttribute('src',filePath);
  ImgEl.className = 'userImage';
  var pEl = document.getElementById(nameId);
  pEl.textContent = userName;
  pEl.className = 'BroName';
}

function setPhotoAndNames () {
  for (var i = 0; i < broNachoIds.length; i++) {
    setupResults(broNachoIds[i], broNachoNames[i], top3BroNachosArray[i].filePath, top3BroNachosArray[i].userName);
  }
  for (var i = 0; i < broNachoIds.length; i++) {
    setupResults(nachoBroIds[i], nachoBroNames[i], bottom3BroNachosArray[i].filePath, bottom3BroNachosArray[i].userName);
  }
}

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

calculateTotalPossible();
setPhotoAndNames ();
findPercentage();
populateGage();
