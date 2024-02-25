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
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];
// The item we are trying to find 
let item; 
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
  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
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
