/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let backgroundImage;
const STATE = {
  INTRO: 'INTRO',
  SIMULATION: 'SIMULATION',
  WIN: 'WIN',
  LOSE: 'LOSE'
};
let state = 'INTRO';


/**
Description of preload
*/
function preload() {
  backgroundImage = loadImage('assets/images/intro.jpg');
}


/**
Description of setup
*/
function setup() {
  // Create a fixed canvas 
  createCanvas(1200, 570);

}


/**
Description of draw()
*/
function draw() {
  switch (state) {
    case STATE.INTRO:
      intro();
      break;
    case STATE.SIMULATION:
      simulation();
      break;
    case STATE.WIN:
     win();
     break;
    case STATE.LOSE:
      lose();
      break;
  }
}

// State Functions 
function intro(){
  // Set the background to the into image 
  background(backgroundImage);
}

function simulation(){

}

function win(){

}

function lose(){

}