'use strict'

var formResults = document.getElementById('form-results');
var theForm = document.getElementById('form');

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
