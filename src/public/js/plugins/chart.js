var chartJS = "{{chartJS}}";
var canvas = document.getElementById("lineChartDemo");
var ctx = canvas.getContext("2d");
var img = new Image();
img.onload = function () {
  ctx.drawImage(img, 0, 0);
};
img.src = chartJS;
