//JavaScript

//Initial states
var redBox = document.getElementById("redbox");
var greenBox = document.getElementById("greenbox");

var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
var container = document.querySelector(".ani-canvas");
var leftMargin = container.getBoundingClientRect().left;

var leftBoxPos = 0 - leftMargin;
var limit = document.body.clientWidth / 2;

window.addEventListener("load", run, false);

function run() {  
  inView(redBox);
  redBox.addEventListener("inview", activeState, false);
  redBox.addEventListener("inview", animateElemToLeft, false);
  redBox.addEventListener("outofview", inactiveState, false);  
  window.addEventListener("scroll", function(){inView(redBox);}, false);
}

function animateElemToLeft(evt) {
  var elem = evt.currentTarget;
  var elemWidth = elem.getBoundingClientRect().width;
  var elemPos = elem.getBoundingClientRect().left;
  var scrollDir;  
    
  var curr = window.pageYOffset || document.documentElement.scrollTop;  
    
  if ((curr - scrollPos) <= 0) {
    scrollDir = "up";    
    leftBoxPos > (0 - leftMargin - elemWidth) ? leftBoxPos -= 20 : leftBoxPos = 0 - leftMargin - elemWidth;      
  }
  else if ((curr - scrollPos) >= 0) {
    scrollDir = "down";
    if (elemPos <= (limit - elemWidth)) {
      leftBoxPos += 20; 
    }    
  }
  
  elem.style.transform = "translateX(" + leftBoxPos + "px)";
  scrollPos = curr;  
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
