/**
Title of Project: Jellyfish Jive 

Paria Jafarian 

In this game you take on a mission as a marine biologist to cunduct research by scuba diving into the Pacific Ocean.
Your research group needs you to find certain rare species. So your goal is to find these special species by pointing your finger to them.
But you gotta be very fast because your oxygen mask might run out at any moment!!

*/

"use strict";
//Background image for different states  
let backgroundImage;
let backgroundList; 
let backgroundSimulation; 
let backgroundWin;
let backgroundLose;
let backgroundTime; 
// User's webcam
let video;
// The name of the model
let modelName = 'Handpose';
// Handpose object
let handpose;
//Timer variables  
let timeleft = 120;
let startTime = 0;
let currentTime = 0;
// The current set of predictions made by Handpose once it's running
let predictions = [];
// Array to add the items that the user finds 
let foundItems = [];
// The items the use is trying to find 
let item = [
{
  x: 395,
  y: 149.5
}, {
  x: 203,
  y: 413.5
}, {
  x: 52,
  y: 364.5
}, {
  x: 84,
  y: 90.5
}, {
  x: 346,
  y: 336.5
}, {
  x: 571,
  y: 223.5
}, {
  x: 585,
  y: 106.5
}
]; 
// Tracking the index finger 
let indexCircle = {
  x : undefined,
  y : undefined,
  size : 20
};
//Jelly Fish 
let jellyFish = [
{
  x : 235,
  y : 182.5
}, {
  x: 134,
  y: 148.5
}, {
  x: 184,
  y: 186.5
}, {
  x: 226,
  y: 238.5
}, {
  x: 135,
  y: 168.5
}, {
  x: 90,
  y: 161.5
}
];
//Different States
const STATE = {
  INTRO: 'INTRO',
  LIST: 'LIST',
  SIMULATION: 'SIMULATION',
  WIN: 'WIN',
  LOSE: 'LOSE',
  NOTIME : 'NOTIME'
};
//Current state of the program 
let state = 'INTRO';

// Making sure that all of my background images are loaded
function preload() {
  backgroundImage = loadImage('assets/images/intro.jpg');
  backgroundList = loadImage('assets/images/list.jpg');
  backgroundSimulation = loadImage('assets/images/simulation.jpg');
  backgroundWin = loadImage('assets/images/goodjob.jpg');
  backgroundLose = loadImage('assets/images/byebye.jpg');
  backgroundTime = loadImage('assets/images/faster.jpg');
}
// Setting up ml5 handpose model 
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
function handleHandDetection(results) {
    predictions = results;
  }
// Responsible for switching from on state to another
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
   case STATE.NOTIME:
      notime();
      break;
  }
}
// All the different State Functions 
function intro(){
  background(backgroundImage);
}
function list(){
  background(backgroundList);
}
function win(){
  background(backgroundWin);
}
function lose(){
  background(backgroundLose);
}
function notime(){
  background(backgroundTime);
}
/**
Starting the timer, drawing a green circle on the item once it has been found, switching to WIN state when all 7 items have been found, 
switching to NOTIME state when the timer runs out and finally, switching to LOSE state when the user goes on a jelly fish.
*/
function simulation() {
  background(backgroundSimulation);  
  // Start the timer if it hasn't started yet
  if (startTime === 0) {
    startTime = millis();
  }
  // Calculate the current time
  currentTime = floor((millis() - startTime) / 1000);
  // Calculate the remaining time
  let remainingTime = timeleft - currentTime;
  // Display the timer on the canvas
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER); 
  text(convertSeconds(remainingTime), width / 2, 40); 
  // Check if the timer has reached 0
  if (remainingTime <= 0) {
    state = STATE.NOTIME;
  }
  // Check if there are currently predictions to display
  if (predictions.length > 0) {
      // If yes, then get the positions of the tip of the index finger
      updateIndexCircle(predictions[0]);
        // Check if the user touches any of the jellyfish points
        for (let i = 0; i < jellyFish.length; i++) {
          let d = dist(indexCircle.x, indexCircle.y, jellyFish[i].x, jellyFish[i].y);
          let acceptableDistance = indexCircle.size / 2;
          if (d < acceptableDistance) {
              // Change the state to LOSE if the user touches a jellyfish point
              state = STATE.LOSE;
          }
      }
      // Loop through each item in the item array
      for (let i = 0; i < item.length; i++) {
          // Check if the item has already been found
          if (foundItems.includes(i)) {
              // Draw a green circle around the item if it has been found
              found(item[i]);
          } else {
              // Calculate the distance between the item and the index circle
              let d = dist(indexCircle.x, indexCircle.y, item[i].x, item[i].y);
              // Set an acceptable distance threshold
              let acceptableDistance = indexCircle.size / 2;
              // Check if the distance is within the acceptable threshold
              if (d < acceptableDistance) {
                  // Draw a green circle around the item
                  found(item[i]);
                  // Add the index of the found item to the foundItems array
                  foundItems.push(i);
              }
          }
      }
        // Check if all the items have been found
        if (foundItems.length === item.length) {
          // Change the state to WIN
          state = STATE.WIN;
      }
      // Display the current position of the index
      displayIndex();
  }
}
// Converting seconds to what we are used to seeing time represented as
function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}
// Getting the position of the index finger  
function updateIndexCircle(prediction){
  indexCircle.x = prediction.annotations.indexFinger[3][0];
  indexCircle.y = prediction.annotations.indexFinger[3][1];
}
// Displays the finger as a red circle.
function displayIndex() {
  // Draw index circle
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(indexCircle.x, indexCircle.y, indexCircle.size);
  pop();
}
// Displays a green circle on the fouund item 
function found(position) {
  push();
  fill(0, 255, 0);
  noStroke();
  ellipse(position.x, position.y, indexCircle.size);
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


