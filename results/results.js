'use strict';

var top3BroNachosArray = JSON.parse(localStorage.getItem('top3BroNachos'));

var ImgEl = document.getElementById('BroNacho1');
ImgEl.setAttribute('src',top3BroNachosArray[0].filePath);
var pEl = document.getElementById('BroNacho1Name');
pEl.textContent = top3BroNachosArray[0].userName;

var ImgEl2 = document.getElementById('BroNacho2');
ImgEl2.setAttribute('src',top3BroNachosArray[1].filePath);
var pEl2 = document.getElementById('BroNacho2Name');
pEl2.textContent = top3BroNachosArray[1].userName;

var ImgEl3 = document.getElementById('BroNacho3');
ImgEl3.setAttribute('src',top3BroNachosArray[2].filePath);
var pEl3 = document.getElementById('BroNacho3Name');
pEl3.textContent = top3BroNachosArray[2].userName;
