import { canvas, container } from "./scripts/sketch";

export function setupStartScreen () {
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
}