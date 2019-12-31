//JavaScript

//Initial states
var redBox = document.getElementById("redbox");
var greenBox = document.getElementById("greenbox");

var leftBoxStart;
var rightBoxStart;

leftBoxStart = rightBoxStart = window.pageYOffset || document.documentElement.scrollTop;

var container = document.querySelector(".ani-canvas");
var leftMargin = container.getBoundingClientRect().left;
var rightMargin = container.getBoundingClientRect().left;

var leftBoxPos = 0 - leftMargin;
var rightBoxPos = document.body.clientWidth + greenBox.getBoundingClientRect().width;

var limit = document.body.clientWidth / 2;

window.addEventListener("load", run, false);

function run() {  
  inView(redBox);
  inView(greenBox);
  
  redBox.addEventListener("inview", activeState, false);
  redBox.addEventListener("inview", animateElemToLeft, false);
  redBox.addEventListener("outofview", inactiveState, false);  
  window.addEventListener("scroll", function(){inView(redBox);}, false);
  
  greenBox.addEventListener("inview", activeState, false);
  greenBox.addEventListener("inview", animateElemToRight, false);
  greenBox.addEventListener("outofview", inactiveState, false);  
  window.addEventListener("scroll", function(){inView(greenBox);}, false);
}

function animateElemToLeft(evt) {
  var elem = evt.currentTarget;
  var elemWidth = elem.getBoundingClientRect().width;
  var elemPos = elem.getBoundingClientRect().left;
  var scrollDir;  
    
  var curr = window.pageYOffset || document.documentElement.scrollTop;  
    
  if ((curr - leftBoxStart) <= 0) {
    scrollDir = "up";    
    leftBoxPos > (0 - leftMargin - elemWidth) ? leftBoxPos -= 20 : leftBoxPos = 0 - leftMargin - elemWidth;      
  }
  else if ((curr - leftBoxStart) >= 0) {
    scrollDir = "down";
    if (elemPos <= (limit - elemWidth)) {
      leftBoxPos += 20; 
    }    
  }
  
  elem.style.transform = "translateX(" + leftBoxPos + "px)";
  leftBoxStart = curr;  
}


function animateElemToRight(evt) {
  var elem = evt.currentTarget;
  var elemWidth = elem.getBoundingClientRect().width;
  var elemPos = elem.getBoundingClientRect().left;
  var scrollDir;  
    
  var curr = window.pageYOffset || document.documentElement.scrollTop;  
    
  if ((curr - rightBoxStart) <= 0) {
    scrollDir = "up";    
    rightBoxPos += 20;    
  }
  else if ((curr - rightBoxStart) >= 0) {
    scrollDir = "down";
    rightBoxPos -= 20;   
  }
  
  console.log(scrollDir);
  
  elem.style.transform = "translateX(" + rightBoxPos + "px)";
  rightBoxStart = curr;  
}

function inView(elem) {
  var elemPos;
  var curr;
  var elemH = parseInt(getComputedStyle(elem).height, 10);
  
  if (window.scrollY) {
    elemPos = elem.getBoundingClientRect().top + window.scrollY;
    curr = window.innerHeight + window.scrollY;
  }
  else {
    elemPos = elem.getBoundingClientRect().top + document.documentElement.scrollTop;
    curr = window.innerHeight + document.documentElement.scrollTop;
  }
  
  if (curr > elemPos) {
    //Elem is in the current view    
    elemPos = elemPos + elemH;
    
    curr = window.scrollY || document.documentElement.scrollTop;
  }
  if (elemPos > curr) {
    var evt = createNewEvent("inview");
    elem.dispatchEvent(evt);
  }
  else {
    var evt = createNewEvent("outofview");
    elem.dispatchEvent(evt);
  }
  
}

//Helpers
function addClass(elem, myClass) {
  if (elem.classList) {
    elem.classList.add(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var ind = arr.indexOf(myClass);
    if (ind == -1) {
      arr.push(myClass);
      elem.className = arr.join(" ");
    }
  }
}

function removeClass(elem, myClass) {
  if (elem.classList) {
    elem.classList.remove(myClass);
  }
  else {
    var arr = elem.className.split(" ");
    var ind = arr.indexOf(myClass);
    
    if (ind >= 0) {
      arr.splice(ind, 1);
      elem.className = arr.join(" ");
    }
  }
}

function activeState(evt) {
  var elem = evt.currentTarget;
  var myClass = "active";
   
  return addClass(elem, myClass);
}

function inactiveState(evt) {
  var elem = evt. currentTarget;
  var myClass = "active";
  
  return removeClass(elem, myClass);
}

function createNewEvent(evtName) {
  var evt;
  if (typeof Event === "function") {
    evt = new Event(evtName);
  }
  else {
    evt = document.createEvent("Event");
    evt.initEvent(evtName, true, true);
  }
  
  return evt;
}
