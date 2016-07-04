'use strict';

var top3BroNachosArray = JSON.parse(localStorage.getItem('top3BroNachos'));


var ImgEl = document.getElementById('BroNacho1');
ImgEl.setAttribute('src',top3BroNachosArray[0].filePath);

var pEl = document.getElementById('BroNacho1Name');
pEl.textContent = top3BroNachosArray[0].userName;

// imageObjectArray[w] = JSON.parse(localStorage.getItem(imageObjectArray[w].imgName));
//
//
// localStorage.getItem('top3BroNachos',JSON.parse(top3BroNachosObjArray[1]).filePath);
// localStorage.getItem('top3BroNachos',JSON.parse(top3BroNachosObjArray[2]).filePath);
