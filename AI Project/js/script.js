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

// User's webcam
let video;
// The name of our model
let modelName = 'Handpose';
// Handpose object
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];
// The item we are trying to find 
let item = [
{
  x: 395,
  y: 149.5
}, {
  x: 203,
  y: 413.5
}, {
  x: 54,
  y: 521.5
}, {
  x: 58,
  y: 46.5
}, {
  x: 346,
  y: 336.5
}, {
  x: 1125,
  y: 170.5
}, {
  x: 774,
  y: 537.5
}
]; 
// The indextracker 
let indexCircle = {
  x : undefined,
  y : undefined,
  size : 20
};

//State stuff 
const STATE = {
  INTRO: 'INTRO',
  LIST: 'LIST',
  SIMULATION: 'SIMULATION',
  WIN: 'WIN',
  LOSE: 'LOSE'
};

//Current state of the program 
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

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {flipHorizontal: true}, modelLoaded)
}

function modelLoaded() {
  // Now we know we're ready we can switch states
  state = STATE.INTRO;
  // What to do 
  handpose.on('predict', handleHandDetection);   
  // Listen for prediction events from Handpose and store the results in our predictions array when they occur
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

    // Check if there currently predictions to display
    if (predictions.length > 0) {
      // If yes, then get the positions of the tip and base of the index finger
      updateIndexCircle(predictions[0]);

    for (i=0; i < item.length; i++){
    // Check if index finger is touching one of the items in the item array 
    let d = dist(indexCircle.x, indexCircle.y, item[i].x, item[i].y);
    if (d < bubble.size / 2) {
    // draw a green circle
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(item[i].x, item[i].y, indexCircle.size);
    pop();
    }
   // Display the current position of the index  
   displayIndex();
  }
 }
}

function win(){
  background(0,250,0);
}
function lose(){
  background(0,0,250);
}

function handleHandDetection(results) {
    predictions = results;
  }

function updateIndexCircle(prediction){
  indexCircle.x = prediction.annotations.indexFinger[3][0];
  indexCircle.y = prediction.annotations.indexFinger[3][1];
}

/**
Displays the finger as a red circle.
*/
function displayIndex() {
  // Draw index circle
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(indexCircle.x, indexCircle.y, indexCircle.size);
  pop();
}

function found() {
  // Draw index circle
  push();
  fill(0, 255, 0);
  noStroke();
  ellipse(indexCircle.x, indexCircle.y, indexCircle.size);
  pop();
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
