class levelSelect {
    constructor() {}

    drawLevel(enemies) {
        let backgroundImage = levelBackground[0];
        //draws level
        background('#fffff8');
        stroke('#222831');
        noFill();
        strokeWeight(1);
        rectMode("corners");
        rect(0, 0, w, h);
        rectMode("center");
        


        image(backgroundImage, 1, 1, w-2, h-2); //need to add more levels (array for enemies)

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

        if(keyIsDown(LEFT_ARROW)) {        
            if(characterX > 25 && !window.checkColorCollision(backgroundImage, characterX, characterY, 2, h/9)) {
                characterX -= 2;
            }
            if(greenCollide){ //end level
                return true;
            }
            flipped = false;      
        }
        if(keyIsDown(RIGHT_ARROW)) {
            if(characterX < w - w/15 - 2 && !window.checkColorCollision(backgroundImage, characterX + 2*w/15, characterY, 2, h/9)) {
                characterX += 2;
            }
            if(greenCollide){ //end level
                return true; 
            }
            flipped = true;
        }
        if(keyIsDown(UP_ARROW)) {
            if(characterY > 10 && !window.checkColorCollision(backgroundImage, characterX , characterY - 1, w/15, 2)) {
                characterY -= 2;
            }
            if(greenCollide){ //end level
                return true;
            }
        } 
        if(keyIsDown(DOWN_ARROW)) {
            if(characterY < h - h/9 - 1 && !window.checkColorCollision(backgroundImage, characterX , characterY + 3 + h/9, w/15, 2)) {
                characterY += 2;
            }
            if(greenCollide){ //end level
                return true;
            }
        }

        if(keyIsDown(32) && !shooting) { //create shot
        shooting = true;
            if(flipped) {
                shots.push(characterX + w/15, characterY+h/16, -1);
            } else {
                shots.push(characterX, characterY+h/16, -2);
            }
        } 
        if(!keyIsDown(32)){
        shooting = false;
        }
    }
}