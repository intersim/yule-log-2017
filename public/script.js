// get the date
var date = (new Date()).getDate();
var today = date <= 25 ? date : 25;
var month = (new Date()).getMonth() + 1; // getMonth returns a zero-based value
var selected = today;

// if it's not december...
if (month !== 12) {
  var backgroundElement = document.getElementById('background');
  background.innerText = "YuleLog.Life starts on December 1st"
} 
else {
  // create video
  var width = window.innerWidth;
  var height = window.innerHeight;
  var baseUrl = 'https://www.youtube.com/embed/';
  var urlParams = '?modestbranding=0;loop=1;showinfo=0;autoplay=1;iv_load_policy=3;fs=0';

  var iframe = document.getElementsByTagName('iframe')[0];

  iframe.setAttribute('width', width);
  iframe.setAttribute('height', height);

  var url = baseUrl + videos[today] + urlParams;

  iframe.setAttribute('src', url);
  iframe.setAttribute('allow', 'autoplay');

  window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;

    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);
  }

  // create numbers
  var numbersContainer = document.getElementById('numbers');
  numbersContainer.onclick = changeVideoCallback;

  function changeVideoCallback (event) {
    var number = event.target.innerText;
    if (number > today) return;

    var dayElement = document.getElementById(number);
    var prevSelectedElement = document.getElementById(selected);

    prevSelectedElement.classList.remove('selected');
    selected = number;
    dayElement.classList.add('selected');

    var url = baseUrl + videos[number] + urlParams;
    iframe.setAttribute('src', url);
  }

  for (var i = 1; i <= 25; i++) {
    var dayElement = document.createElement('span');
    dayElement.id = i;

    dayElement.classList.add('number');

    if (i <= today) dayElement.classList.add('active');
    else dayElement.classList.add('inactive');
    if (i === today) dayElement.classList.add('selected');

    dayElement.innerText = i;
    numbersContainer.appendChild(dayElement);
  }

  // fade out numbers when mouse isn't moving
  var bodyElement = document.getElementById('body');
  var numbersElement = document.getElementById('numbers')
  var timeoutId = null;

  timeoutId = setTimeout(function () {
    fadeOut(numbersElement);
  }, 4000);

  bodyElement.addEventListener('mousemove', function (e) {
    if (timeoutId !== null) clearInterval(timeoutId);

    fadeIn(numbersElement); 

    timeoutId = setTimeout(function () {
      if (e.target.id === 'numbers' || e.target.classList.contains('number')) return;
      fadeOut(numbersElement); 
    }, 3000);
  });

  function fadeIn (element) {
    element.classList.remove('disappear');
    element.classList.add('appear');
  }

  function fadeOut (element) {
    element.classList.add('disappear');
    element.classList.remove('appear');
  }

  // fade out numbers when mouse leaves the window
  function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  }

  addEvent(window,"load",function(e) {
    addEvent(document, "mouseout", function(e) {
      e = e ? e : window.event;
      var from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName == "HTML") {
        timeoutId = setTimeout(function () {
          fadeOut(numbersElement); 
        }, 3000);
      }
    });
  });
}

