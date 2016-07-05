'use strict';

var ingredientsArray = ['rice', 'beans', 'chicken', 'onions', 'jalapenos', 'corn', 'salsa', 'sourCream', 'guac', 'olives', 'cilantro', 'beer'];
var top3BroNachosArray = JSON.parse(localStorage.getItem('top3BroNachos'));
var bottom3BroNachosArray = JSON.parse(localStorage.getItem('bottom3BroNachos'));
var allUsers = JSON.parse(localStorage.getItem('allUsers'));

var ImgEl = document.getElementById('BroNacho1');
ImgEl.setAttribute('src',top3BroNachosArray[0].filePath);
var pEl = document.getElementById('BroNacho1Name');
pEl.textContent = top3BroNachosArray[0].userName;

var ImgEl = document.getElementById('BroNacho2');
ImgEl.setAttribute('src',top3BroNachosArray[1].filePath);
var pEl = document.getElementById('BroNacho2Name');
pEl.textContent = top3BroNachosArray[1].userName;

var ImgEl = document.getElementById('BroNacho3');
ImgEl.setAttribute('src',top3BroNachosArray[2].filePath);
var pEl = document.getElementById('BroNacho3Name');
pEl.textContent = top3BroNachosArray[2].userName;

var ImgEl = document.getElementById('NachoBro1');
ImgEl.setAttribute('src',bottom3BroNachosArray[0].filePath);
var pEl = document.getElementById('NachoBro1Name');
pEl.textContent = bottom3BroNachosArray[0].userName;

var ImgEl = document.getElementById('NachoBro2');
ImgEl.setAttribute('src',bottom3BroNachosArray[1].filePath);
var pEl = document.getElementById('NachoBro2Name');
pEl.textContent = bottom3BroNachosArray[1].userName;

var ImgEl = document.getElementById('NachoBro3');
ImgEl.setAttribute('src',bottom3BroNachosArray[2].filePath);
var pEl = document.getElementById('NachoBro3Name');
pEl.textContent = bottom3BroNachosArray[2].userName;

var ulEl = document.getElementById('ingredients');

for (var i = 0; i < ingredientsArray.length; i++) {
  var liEl = document.createElement('li');
  liEl.textContent = ingredientsArray[i];
  liEl.className = 'not-matched';
  if(allUsers[8].userToppingsArray[i] === top3BroNachosArray[0].userToppingsArray[i]) {
    liEl.className = 'matched';
  }
  ulEl.appendChild(liEl);
}
