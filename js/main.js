//JavaScript
var boxPos = 0;
var scrollPos = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener("load", run, false);

function run() {          
  var redBox = document.getElementById("redbox"); 
  
  inView(redBox);
  redBox.addEventListener("inview", activeState, false);
  redBox.addEventListener("inview", animateElem, false);
  redBox.addEventListener("outofview", inactiveState, false);  
  window.addEventListener("scroll", function(){inView(redBox);}, false);
}

function animateElem(evt) {
  var elem = evt.currentTarget;  
  var scrollDir;  
  var bodyWidth = document.body.getBoundingClientRect().width;  
    
  var curr = window.pageYOffset || document.documentElement.scrollTop;
  var leftMargin = (window.scrollX + elem.getBoundingClientRect().left) || (document.documentElement.scrollLeft + elem.getBoundingClientRect().left);
    
  if ((curr - scrollPos) <= 0) {
    scrollDir = "up";
    curr == 0 ? boxPos = 0 : boxPos -= 20;
    boxPos > 0 ? boxPos -= 20 : boxPos = 0;      
  }
  else if ((curr - scrollPos) >= 0) {
    scrollDir = "down";
    boxPos += 20;
  }
   
  elem.style.transform = "translateX(" + boxPos + "px)";
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
    addClass(elem, "active"); 
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
