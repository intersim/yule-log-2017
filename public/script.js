let width = window.innerWidth;
let height = window.innerHeight;

const [ iframe ] = document.getElementsByTagName('iframe');

iframe.setAttribute('width', width);
iframe.setAttribute('height', height);

const random = Math.floor(Math.random() * 25); 

console.log("video index", random)

const url = videos[random] + '?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1';

iframe.setAttribute('src', url);

window.onresize = function() {
  width = window.innerWidth;
  height = window.innerHeight;

  iframe.setAttribute('width', width);
  iframe.setAttribute('height', height);
}