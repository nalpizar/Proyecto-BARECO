var hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
var current = "";
var stop = true;

function start() {
  if(stop == true) {
    stop = false;
    cronometro();
  }
}

function cronometro() {
  if(stop == false) {
    milliseconds++;
    if(milliseconds > 9) {
      milliseconds = 0;
      seconds++;
    }
    if(seconds > 59) {
      seconds = 0;
      minutes++;
    }
    if(minutes > 59) {
      minutes = 0;
      hours++;
    }
    showTime();
    setTimeout("cronometro()", 100);
  }
}

function showTime() {
  if(hours < 10) current = "0"; else current = hours;
  if(minutes < 10) current = current + "0";
  current = current + minutes + ":";
  if(seconds < 10) current = current + "0";
  current = current + seconds + ":" + milliseconds;
  document.getElementById("current").innerHTML = current;
}

function stoptime() {
  stop = true;
}