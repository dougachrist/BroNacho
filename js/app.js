'use strict';

var formResults = document.getElementById('form-results');
var theForm = document.getElementById('form');
var top3Bros = [];

window.onload = function () {
  if (JSON.parse(localStorage.getItem('top3BroNachos') != null)) {
    var top3BroNachos = JSON.parse(localStorage.getItem('top3BroNachos'));
    top3Bros.push(top3BroNachos);
    var h2El = document.createElement('h2');
    h2El.textContent = 'Your Previous Matches:';
    formResults.appendChild(h2El);
    for(var i = 0; i < top3Bros[0].length; i++) {
      var liEl = document.createElement('li');
      var imgEl = document.createElement('img');
      liEl.appendChild(imgEl);
      imgEl.setAttribute('src',top3Bros[0][i].filePath);
      var pEl = document.createElement('p');
      pEl.textContent = top3Bros[0][i].userName;
      liEl.appendChild(pEl);
      formResults.appendChild(liEl);
      var greeting = document.getElementById('greeting');
      greeting.textContent = 'Welcome back! Feel free to try again, or take a look at your matches below.';
      var button = document.getElementById('button');
      button.value = 'Try BroNacho Again!';
      var intro = document.getElementById('intro');
      intro.className = 'hidden';
    }
  }
};

function validateName(fieldText){
  var isValid = false,
    goodChars = 'abcdefghijklmnopqrstuvwxyz0123456789.\'-'; // every acceptable character

  // check that every input character is good
  if (fieldText) {
    var countLetters = 0;

    for (var i = 0; i < fieldText.length; i++) {
      var oneLetter = fieldText[i].toLowerCase();

      // check that this one letter is good
      for (var j = 0; j < goodChars.length; j++) {
        if (oneLetter === goodChars[j]) {
          countLetters++;
          break;
        }
      }
    }
    if (countLetters === fieldText.length) {
      isValid = true;
    }
  }
  return isValid;
};

theForm.addEventListener('submit', function(event) {
  event.preventDefault();
  var inputField = document.getElementById('submit');
  if(validateName === false) {
    alert('This field cannot be empty!');
  }
});

function redirect() {
  window.location.href = '../html/nacho-builder.html';
}
