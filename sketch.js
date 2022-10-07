let font;
let textLayer;

let container;
let w;
let h;
let border;

let screen = 0;
let screenDrawn = 1;

let angle = 0;

let characterX = 150;
let characterY = 150;

let imgCharRest1;
let imgCharRest2;
//import { setupStartScreen } from "./start_screen";
//import CharacterRest1, CharacterRest2 from "./assets";


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

  imgCharRest1 = loadImage('assets/CharacterRest1.png'); //load rest 1
  image(imgCharRest1, 10, 10);
  imgCharRest2 = loadImage('assets/CharacterRest2.png'); //load rest 2
  image(imgCharRest2, 10, 10);
}

function setupScreen(screenNum) {
  if(screenNum == 0) { //start screen
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
  if(screenNum == 1){ //level select screen
    background('#fffff8');
    // border
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    screenDrawn = 1;

    //level buttons
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

    //back button
    fill('#dddddd');
    rectMode("corners");
    strokeWeight(3);
    rect(10, 15, 90, 65);
    textFont("monospace");
    fill('#010101');
    strokeWeight(1);
    textSize(height/12);
    text('Back', 50, 40);

    //title text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Levels', w/2, h*(3/16));
    
    screenDrawn = 1;
  }
  if(screenNum == 2){ //level 1
    background('#fffff8');

    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    rectMode("center");
    image(imgCharRest1, characterX, characterY, w/15, h/9);
    /*
    if(((new Date.getTime()) % 100000) > 50000) { //trying to get time to do different things for rest
      image(imgCharRest1, w/2, h/2, w/15, h/9); //character
    } else {
      image(imgCharRest2, w/2, h/2, w/15, h/9);
    }
    */
    screenDrawn = 2;
  }
}

function mousePressed(){
  if(screen == 0) { //Start screen buttons
    //start button
    if(mouseX > w/4 && mouseX < w*(3/4) && mouseY > h/2 && mouseY < h*(5/8)){
      screen = 1;
    }
  }
  if(screen == 1) { //level select buttons
    if(mouseX > 10 && mouseX < 90 && mouseY > 15 && mouseY < 65){ //back button
      screen = 0;
    }
    for(i = 0; i < 4; i++){ // level buttons
      levelBtnWidth = w*(1/4)*i + 70; 
      for(j = 0; j < 2; j++){
        levelBtnHeight = h*(1/3)*j + 150;
        if(mouseX > levelBtnWidth-50 && mouseX < levelBtnWidth + 50 && mouseY > levelBtnHeight-50 && mouseY < levelBtnHeight+50){
          screen = i+2+(4*(j));  //level screens start at 2
        }    
      }
    }
  }
}

function keyPressed() {
  if(keyCode === "LEFT_ARROW") {
    characterX -= 1;
  } else if (keyCode === "RIGHT_ARROW") {
    characterX += 1;
  }
}

function draw() {
  if (screen != screenDrawn){
    setupScreen(screen);
  }
  if(screen == 2) {
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


