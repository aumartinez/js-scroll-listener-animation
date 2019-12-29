//JavaScript

window.addEventListener("load", run, false);

function run() {
  let elem = document.getElementById("redbox");
  
  window.addEventListener("scroll", function(){getPos(elem);}, false);
}

function getPos(elem) {
  let elemPos;
  let curr;
  
  if (window.scrollY) {
    elemPos = elem.getBoundingClientRect().top + window.scrollY;
    curr = window.innerHeight + window.scrollY;
  }
  else {
    elemPos = elem.getBoundingClientRect().top + document.documentElement.scrollTop;
    curr = window.innerHeight + document.documentElement.scrollTop;
  }
  
  console.log(elemPos);
  console.log(curr);
}