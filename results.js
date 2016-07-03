'use strict';
document.getElementById('BroNacho1');
BroNacho1.textContent = localStorage.getItem('top3BroNachos',JSON.parse(top3BroNachosObjArray[0]).filePath);

localStorage.getItem('top3BroNachos',JSON.parse(top3BroNachosObjArray[1]).filePath);
localStorage.getItem('top3BroNachos',JSON.parse(top3BroNachosObjArray[2]).filePath);
