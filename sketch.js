let font;
let textLayer;

let container;
let w;
let h;
let border;

let screen = 0;
let screenDrawn = 1;

let angle = 0;

function updateContainer() {
  container = select('#sketchContainer');
  w = parseFloat(getComputedStyle(container.elt).getPropertyValue('width'));
  h = parseFloat(getComputedStyle(container.elt).getPropertyValue('height'));
  
}

function windowResized() {
  updateContainer();
  resizeCanvas(w, h);
}

function setup() {
  updateContainer();
  canvas = createCanvas(w, h);
  smooth();
  canvas.parent("#sketchContainer");

}

function setupScreen(screenNum) {
  if(screenNum == 0) {
    //translate(-width / 2, -height / 2);
// background    
    background('#fffff8');

// border
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
//button
    strokeWeight(3);
    rectMode("corners");
    fill('#dddddd');
    rect(w/4, h/2, w*(3/4), h*(5/8));
//text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Start', w/2, h*(9/16));
    screenDrawn = 0;
    //text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Scam Slam', w/2, h*(3/16));
    screenDrawn = 0;
  }
  if(screenNum == 1){
    background('#fffff8');
    // border
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    screenDrawn = 1;
    //levels
    const levels = [];
    for(i = 0; i < 4; i++){
      levelBtnWidth = w*(1/4)*i + 70;
      for(j = 0; j < 2; j++){
        levelBtnHeight = h*(1/3)*j + 150;
        strokeWeight(3);
        rectMode("center");
        if(i+1+(4*(j)) == 1){ //need to have check which levels are unlocked, also add k for different menu (k = 12*menu)
          fill('#228822');
        } else {
          fill('#dddddd');
        }
        rect(levelBtnWidth, levelBtnHeight, 100, 100);
        fill('#010101');
        textFont("monospace");
        strokeWeight(1);
        textSize(height/9);
        textAlign("center", "center");
        text(String(i+1+(4*j)), levelBtnWidth, levelBtnHeight);
      }
    }
    //text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Levels', w/2, h*(3/16));
    screenDrawn = 0;
  }
}

function mousePressed(){
  if(screen == 0) {
    if(mouseX > w/4 && mouseX < w*(3/4) && mouseY > h/2 && mouseY < h*(5/8)){
      screen = 1;
    }
  }
}

function draw() {
  if (screen != screenDrawn){
    setupScreen(screen);
  }
  
  //document.getElementById("fps").innerHTML = frameRate().toFixed(2);
  
}

function colorAlpha(aColor, alpha) {
  // allows usage of HEX colors with alpha
  const c = color(aColor);
  let a = alpha;
  if (alpha <= 0.1) {
    a = 0.1;
  }
  return color('rgba(${[red(c), green(c), blue(c), a].join(', ')})');
}


