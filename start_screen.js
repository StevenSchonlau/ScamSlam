import { canvas, container } from "./scripts/sketch";

export function setupStartScreen () {
    //level one backup code
    background('#fffff8');
        levelOn = 1;
        stroke('#222831');
        noFill();
        strokeWeight(1);
        rectMode("corners");
        rect(0, 0, w, h);
        rectMode("center");
        
        image(level1Image, 1, 1, w-2, h-2);
        if(!flipped) {
        if(!shooting) {
            image(imgCharRest1, characterX, characterY, w/15, h/9);
        } else {
            image(imgCharShoot, characterX, characterY, w/15, h/9);
        }
        } else {
        if(!shooting) {
            image(imgCharRest1Flip, characterX, characterY, w/15, h/9);
        } else {
            image(imgCharShootFlip, characterX, characterY, w/15, h/9);
        }
        }
        enemiesAndShoot(level1Image);

        if(keyIsDown(LEFT_ARROW)) {        
        if(characterX > 25 && !checkColorCollision(level1Image, characterX, characterY, 2, h/9)) {
            characterX -= 2;
        }
        if(greenCollide){ //end level
            screenNum = -1;
        }
        flipped = false;      
        }
        if(keyIsDown(RIGHT_ARROW)) {
        if(characterX < w - w/15 - 2 && !checkColorCollision(level1Image, characterX + 2*w/15, characterY, 2, h/9)) {
            characterX += 2;
        }
        if(greenCollide){ //end level
            screenNum = -1;
        }
        flipped = true;
        }
        if(keyIsDown(UP_ARROW)) {
        if(characterY > 10 && !checkColorCollision(level1Image, characterX , characterY - 1, w/15, 2)) {
            characterY -= 2;
        }
        if(greenCollide){ //end level
            screenNum = -1;
        }
        } 
        if(keyIsDown(DOWN_ARROW)) {
        if(characterY < h - h/9 - 1 && !checkColorCollision(level1Image, characterX , characterY + 3 + h/9, w/15, 2)) {
            characterY += 2;
        }
        if(greenCollide){ //end level
            screenNum = -1;
        }
        }

        if(keyIsDown(32) && !shooting) { //create shot in shots, need to make it hold
        shooting = true;
        if(flipped) {
            shots.push(characterX + w/15, characterY+h/16, -1);
            print("shot");
        } else {
            shots.push(characterX, characterY+h/16, -2);
            print("shot");
        }
        } 
        if(!keyIsDown(32)){
        shooting = false;
        }
}