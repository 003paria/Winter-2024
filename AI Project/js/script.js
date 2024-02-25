/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//Background image stuff 
let backgroundImage;
let backgroundList; 
let backgroundSimulation; 

//State stuff 
const STATE = {
  INTRO: 'INTRO',
  LIST: 'LIST',
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
  backgroundList = loadImage('assets/images/list.jpg');
  backgroundSimulation = loadImage ('assets/images/simulation.jpg');
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
    case STATE.LIST:
      list();
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
function list(){
  background(backgroundList);
}
function simulation(){
  background(backgroundSimulation);
  displayMouseCoordinates();
}
function win(){
  background(0,250,0);
}
function lose(){
  background(0,0,250);
}



// function for when the user presses ENTER and SPACE 
function keyPressed() {    
  // if we are in intro then move on to the list, else go to the simulation
  if (keyCode === ENTER) {
    if (state === STATE.INTRO) {
      state = STATE.LIST;
    } else {
      state = STATE.SIMULATION;
    }
  }
  // if we are in the simulation (only) then move to the list when the use presses SPACE
  if (keyCode === 32) {
    if (state === STATE.SIMULATION) {
      state = STATE.LIST;
    }
  }
}


function displayMouseCoordinates() {
  // Display the mouse coordinates
  let mouseXPosition = mouseX;
  let mouseYPosition = mouseY;
  
  // Set text style
  textSize(16);
  fill(0);
  
  // Display coordinates at (20, 20)
  text("MouseX: " + mouseXPosition, 20, 20);
  text("MouseY: " + mouseYPosition, 20, 40);
}
