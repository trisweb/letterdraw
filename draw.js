
window.onload = function() {

  document.ontouchmove = function(e){ e.preventDefault(); }

  var canvas  = document.getElementById('main');
  var canvastop = canvas.offsetTop;

  var progress = document.getElementById('progress-bar');

  var WIDTH = 300;
  var HEIGHT = 450;

  var context = canvas.getContext("2d");

  var lastx;
  var lasty;

  context.strokeStyle = "#000000";
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = 5;

  function clear() {
    context.fillStyle = "#ffffff";
    context.rect(0, 0, WIDTH, HEIGHT);
    context.fill();

    progress.classList.remove("start");
  }

  var timerRef = null;

  function stopClearTimer() {
    if (timerRef) {
      clearTimeout(timerRef);
      timerRef = null;

      progress.classList.remove("start");
    }
  }

  function startClearTimer() {
    stopClearTimer();
    setTimeout(function() {
      timerRef = setTimeout(clear, 1000);
      progress.classList.add("start");
    }, 200);
  }

  function dot(x,y) {
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(x,y,1,0,Math.PI*2,true);
    context.fill();
    context.stroke();
    context.closePath();
  }

  function line(fromx,fromy, tox,toy) {
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.stroke();
    context.closePath();
  }

  canvas.ontouchstart = function(event){
    event.preventDefault();
    stopClearTimer();

    lastx = event.touches[0].clientX;
    lasty = event.touches[0].clientY - canvastop;

    dot(lastx,lasty);
  }

  canvas.ontouchmove = function(event){
    event.preventDefault();
    stopClearTimer();

    var newx = event.touches[0].clientX;
    var newy = event.touches[0].clientY - canvastop;

    line(lastx,lasty, newx,newy);

    lastx = newx;
    lasty = newy;
  }

  canvas.ontouchend = function(event) {
    // Start the timer to clear.
    startClearTimer();
  }

  clear();
}
