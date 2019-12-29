//JavaScript

window.addEventListener("load", run, false);

function run() {
  var redBox = document.getElementById("redbox");
  
  checkCurrentWindow();
  window.addEventListener("resize", checkCurrentWindow, false);
  window.addEventListener("scroll", checkCurrentWindow, false);
  window.addEventListener("scroll", function(){animateElem(redBox);}, false);
  window.addEventListener("scroll", function(){inView(redBox);}, false);
}

function checkCurrentWindow() {
  //If document is smaller than window
  var bodyH = parseInt(getComputedStyle(document.body).height, 10);
  var winH = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
        
  if (winH > bodyH) {
    newH = winH + 100;
    document.body.style.height = newH + "px";    
  }
}

function animateElem(elem) {
  //console.log(elem);
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
  
  console.log(elemPos);
  console.log(elemH);
  console.log(curr);
  console.log(window.scrollY);
}

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