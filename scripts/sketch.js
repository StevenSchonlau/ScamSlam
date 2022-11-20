let font;
let textLayer;

let container;
let w;
let h;
let border;

let screen = 0;
let screenDrawn = 1;

let angle = 0;

let characterX = w/2;
let characterY = h/2;

let imgCharRest1;
let imgCharRest1Flip;
let imgCharRest2;
let imgCharShoot;
let imgCharShootFlip;
let level1Image;
let imgEnemy;
let level2aImage;
let level2bImage;
let level2Image;
let enemyLimit = 8;
let enemiesMade = 0;

let flipped = false;
let shooting = false;
let levelOn = 0;

const shots = [];
const enemiesXY = [];

const levels = [];

let levelBackground = [];

let collisionColor = '#000000';
let greenCollide = false;
let redCollide = false;

let enemies = false;

let inJump = false;
let jumpNum = 1;

let pausedLevel = 0;
let paused = false;


function updateContainer() {
  container = select('#sketchContainer');
  w = parseFloat(getComputedStyle(container.elt).getPropertyValue('width'));
  h = parseFloat(getComputedStyle(container.elt).getPropertyValue('height'));
  
}

function windowResized() {
  updateContainer();
  resizeCanvas(w, h);
  setupScreen(screen);
}

function setup() {
  updateContainer();
  canvas = createCanvas(w, h);
  smooth();
  canvas.parent("#sketchContainer");

  imgCharRest1 = loadImage('assets/CharacterRest1.png'); //load rest 1
  image(imgCharRest1, 10, 10);
  imgCharRest1Flip = loadImage('assets/CharacterRest1Flip.png'); //load rest 1 flipped
  image(imgCharRest1Flip, 10, 10);
  imgCharRest2 = loadImage('assets/CharacterRest2.png'); //load rest 2
  image(imgCharRest2, 10, 10);
  imgCharShoot = loadImage('assets/CharacterFire.png');
  image(imgCharShoot, 10, 10);
  imgCharShootFlip = loadImage('assets/CharacterFireFlip.png');
  image(imgCharShootFlip, 10, 10);
  level1Image = loadImage('assets/LEVEL1.png'); //load rest 2
  image(level1Image, w, h);
  level2bImage = loadImage('assets/LEVEL2.png');
  image(level2bImage, w, h);
  level2aImage = loadImage('assets/LEVEL2a.png');
  image(level2aImage, w, h);
  imgEnemy = loadImage('assets/EnemyTransparent.png'); //load enemy
  image(imgEnemy, 10,10); 
  
}
 
function setupScreen(screenNum) {
  if(screenNum == 0) { //start screen
    if (!checkLevelComplete(1)) {
      levels.push(1);
    }
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
        if(checkLevelComplete(i+1+(4*(j)))){ //need to have check which levels are unlocked, also add k for different menu (k = 12*menu)
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
    //moved
    const level1Obj = new levelSelect();
    levelBackground = [level1Image];
    if(level1Obj.drawLevel(false)) { //returns true upon completion
      levelOn = 1;
      screenNum = -1;
    }
    enemiesAndShoot(level1Image);
    screenDrawn = 2;
  }
  if(screenNum == 3) { //level 2
    //background and border
    const level2Obj = new levelSelect();
    levelBackground = [level2bImage, level2aImage];
    if(level2Obj.drawLevel(true)) { //returns true on completion
      levelOn = 2;
      screenNum = -1;
    }
    //not repeat
    // if(!enemies || enemiesXY.length != 0) {
    //   image(level2bImage, 1, 1, w-2, h-2);
    //   level2Image = level2bImage;
    // } else if (enemies && enemiesXY.length == 0) {
    //   image(level2aImage, 1, 1, w-2, h-2);
    //   level2Image = level2aImage;
    // }
    //keep
    enemiesAndShoot(level2Obj.getBackgroundImage());

    screenDrawn = 3;
    
  }
  if(screenNum == 4) { //level 3 (last)
    //background and border
    background('#fffff8');
    levelOn = 2;
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    rectMode("center");
    textFont("monospace");
    strokeWeight(1);
    textSize(height/5);
    textAlign("center", "center");
    text("More to come!", w/2, h/3);
    strokeWeight(3);
    rectMode("center");
    fill('#dddddd');
    rect(w/2, h*2/3, 200, 100);
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text("Home", w/2, h*2/3);
    screenDrawn = 4;
  }
  if(screenNum == -1) { //end level screen
    screen = -1;
    background('#fffff8');
    //border
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    //text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Level Complete!', w/2, h*(3/16));
    if(!checkLevelComplete(levelOn+1)) {
      levels.push(levelOn+1);
    }
    strokeWeight(3);
    rectMode("center");
    fill('#dddddd');
    rect(w/4, h*2/3, 200, 100);
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text("Home", w/4, h*2/3);
    strokeWeight(3);
    rectMode("center");
    fill('#dddddd');
    rect(w*3/4, h*2/3, 200, 100);
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text("Next", w*3/4, h*2/3);
    screenDrawn = -1;
  }
  if(screenNum == -2) {
    screen = -2;
    background('#fffff8');
    //border
    stroke('#222831');
    noFill();
    strokeWeight(1);
    rectMode("corners");
    rect(0, 0, w, h);
    //text
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text('Paused', w/2, h*(3/16));
    strokeWeight(3);
    rectMode("center");
    fill('#dddddd');
    rect(w/4, h*2/3, 200, 100);
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text("Home", w/4, h*2/3);
    strokeWeight(3);
    rectMode("center");
    fill('#dddddd');
    rect(w*3/4, h*2/3, 200, 100);
    fill('#010101');
    textFont("monospace");
    strokeWeight(1);
    textSize(height/9);
    textAlign("center", "center");
    text("Resume", w*3/4, h*2/3);
    screenDrawn = -2;
  }
}



window.checkColorCollision = function checkColorCollision(levelImg, x1, y1, x2, y2) { //check collision, position(x1,y1) w =x2 h =y2
  rectMode("center");
  let halfImage = levelImg.get(((x1 - 2)*levelImg.width)/(w-2), ((y1 - 2)*levelImg.height)/(h-2), x2*levelImg.width/(w-2), y2*levelImg.height/(h-2));
  //image(halfImage, 10, 100);
  halfImage.loadPixels();
  greenCollide = false;
  redCollide = false;
  collide = false;
  for (let i = 0; i < halfImage.pixels.length; i += 4) {
    if(halfImage.pixels[i] < 0xff || halfImage.pixels[i + 1] < 0xff || halfImage.pixels[i + 3] < 0xff) {
      //print(halfImage.pixels[i] + " " + halfImage.pixels[i+1] + " " + halfImage.pixels[i+2]);
      if(halfImage.pixels[i] < 212 && halfImage.pixels[i+1] > 212 && halfImage.pixels[i+2] < 212) {
        greenCollide = true;
      }
      if(halfImage.pixels[i] > 0x88 && halfImage.pixels[i+1] < 0x88 && halfImage.pixels[i+2] < 0x88) {
        redCollide = true;
      }
      collide = true; 
    }
  }
  return collide;
}

function mousePressed(){ //buttons
  if(screen == 0) { //Start screen buttons
    //start button
    if(mouseX > w/4 && mouseX < w*(3/4) && mouseY > h/2 && mouseY < h*(5/8)){
      screen = 1;
    }
  } else if(screen == 1) { //level select buttons
    if(mouseX > 10 && mouseX < 90 && mouseY > 15 && mouseY < 65){ //back button
      screen = 0;
    }
    for(i = 0; i < 4; i++){ // level buttons
      levelBtnWidth = w*(1/4)*i + 70; 
      for(j = 0; j < 2; j++){
        levelBtnHeight = h*(1/3)*j + 150;
        if(checkLevelComplete(i+1+(4*(j))) && mouseX > levelBtnWidth-50 && mouseX < levelBtnWidth + 50 && mouseY > levelBtnHeight-50 && mouseY < levelBtnHeight+50){
          shots.length = 0;
          screen = i+2+(4*(j));  //level screens start at 2
          characterX = w/2;
          characterY = h/2;
        }    
      }
    }
  }  else if (screen == 4) {
    if (mouseX > w/2-100 && mouseY > h*2/3-100 && mouseX < w/2+100 && mouseY < h*2/3+100) {
      screen = 1;
    }
  } else if(screen == -1) {
    if (mouseX > w/4-100 && mouseY > h*2/3-100 && mouseX < w/4+100 && mouseY < h*2/3+100) {
      screen = 1;
    }
    if (mouseX > w*3/4-100 && mouseY > h*2/3-100 && mouseX < w*3/4+100 && mouseY < h*2/3+100) {
      screen = levelOn + 2;
    }
  } else if(screen == -2) {
    if (mouseX > w/4-100 && mouseY > h*2/3-100 && mouseX < w/4+100 && mouseY < h*2/3+100) {
      screen = 1;
      paused = false;
    }
    if (mouseX > w*3/4-100 && mouseY > h*2/3-100 && mouseX < w*3/4+100 && mouseY < h*2/3+100) {
      screen = pausedLevel;
      print(pausedLevel);
      paused = false;
    }
  }
}

function checkLevelComplete(levelNum) {
  for (let i = 0; i < levels.length; i++) {
    if(levels[i] == levelNum) {
      return true;
    }
  }
  return false;
}

function enemiesAndShoot(levelImg) {
  for (let i = 0; i < shots.length; i+= 3) {
    if(shots[i+2] == -1) {
      shots[i] += 10;
      if(shots[i] > w-2 || checkColorCollision(levelImg, shots[i], shots[i+1], 2, 1)) {
        line(shots[i], shots[i+1] + 3, shots[i]+2, shots[i+1] -3);
        shots[i+2] = -3;
      }
      stroke("#990000");
      strokeWeight(2);
      line(shots[i], shots[i+1], shots[i]+2, shots[i+1]);
    }
    if(shots[i+2] == -2) {
      shots[i] -= 10;
      if(shots[i] < 0 || checkColorCollision(levelImg, shots[i], shots[i+1], 2, 1)) {
        line(shots[i], shots[i+1] + 3, shots[i]+2, shots[i+1] -3);
        shots[i+2] = -3;
      }
      stroke("#990000");
      strokeWeight(2);
      line(shots[i], shots[i+1], shots[i]-2, shots[i+1]);
    }
    if(shots[i+2] == -3) {
      shots.splice(i, 3);
    }
  }
  for(let i = 0; i < enemiesXY.length; i+= 4) {
    if(enemiesXY[i+2] == -1) {
      enemiesXY[i] += 5;
      if(enemiesXY[i] > w-w/15) {
        enemiesXY[i+2] = -2;
        if(enemiesMade < enemyLimit) { //limit of viruses
          enemiesXY.push(1, 1, -1, -1);
          enemiesMade++;
        }
        if(enemiesXY[i+3] == -1){
          enemiesXY[i+1] += 20;
          if(enemiesXY[i+1] > h-2*h/9) {
            enemiesXY[i+3] = -2;
          }
        } else {
          enemiesXY[i+1] -= 20;
          if(enemiesXY[i+1] < 0) {
            enemiesXY[i+3] = -1;
          }
        }
      }
    } else {
      enemiesXY[i] -= 5;
      if(enemiesXY[i] < 0) {
        enemiesXY[i+2] = -1;
        if(enemiesXY[i+3] == -1) {
          enemiesXY[i+1] += 20;
          if(enemiesXY[i+1] > h-2*h/9) {
            enemiesXY[i+3] = -2
          }
        } else {
          enemiesXY[i+1] -= 20;
          if(enemiesXY[i+1] < 0) {
            enemiesXY[i+3] = -1;
          }
        }
      }
    }
    image(imgEnemy, enemiesXY[i], enemiesXY[i+1], w/15, h/9);
  }
  for(let i = 0; i < shots.length; i+= 3) {
    for(let j = 0; j < enemiesXY.length; j+= 4) {
      if(Math.abs(shots[i] - enemiesXY[j]+w/30) <= w/15 && shots[i+1] > enemiesXY[j+1] && shots[i+1] < enemiesXY[j+1]+h/9){
        shots.splice(i, 3);
        enemiesXY.splice(j, 4);
      }
    }
  }
}

function draw() { //draws screen number
  if (screen != screenDrawn){
    enemies = false;
    enemiesMade = 0;
    setupScreen(screen);
  }
  if(screen == 2 || screen == 3) {
    setupScreen(screen);
  }  
  if(keyIsDown(27)) {
    if(!paused) {
      pausedLevel = screenDrawn;
      screen = -2;
      paused = true;
    }
  }
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

function jumpUp(x) { // a: -9.8 v: -9.8x + 10 p: -4.9x^2 + 10x + characterY, not in use
  if(x >= 3) {
    inJump = false;
    jumpNum = 1;
  } else {
    inJump = true;
    characterY = ((x) - (4.9*x*x) + characterY);
    jumpNum += .1; 
  }
}

