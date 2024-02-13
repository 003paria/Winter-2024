/**
Voice Jam : Storytelling with the computer! 
Paria Jafarian

This is an interactive storytelling game of sorts. 
It is not interactive in the sense of "choose your adventure" type of narratives 
but rather in sense that it is a collaboration with the program because it is pretty much treated 
as a friend that helps you write funny and nonsensical stories.  

The computer starts off the sentence which will then be finished by the user. 
*/

"use strict";
// an array of words that the program will use to begin the sentence
const wordsToUse = [
  "But then",
  "Suddenly", 
  "At the same time", 
  "What a", 
  "How can", 
  "Very interestingly", 
  "Only a loser can",
  "It's hard to",
  "Truly amazing", 
  "Why did it",
  "Once upon a time",
  "The sky",
  "The pigeons",
  "Happily ever after",
  "With great anticipation",
  "In utter disbelief",
  "With a heavy heart",
  "Eagerly awaiting",
  "Joyously celebrating",
  "Running wild",
  "Exploring new worlds",
  "Dancing in the moonlight",
  "Fighting against odds",
  "Climbing mountains",
  "Sailing across oceans",
  "In the shadows",
  "Whispers in the night",
  "Lost in a labyrinth",
  "Searching for clues",
  "Hidden treasures",
  "A secret passage", 
  "Beneath the trees",
  "Amidst the flowers",
  "Underneath the stars",
  "By the riverside",
  "In the heart of the forest",
  "On the mountaintop",
  "In a land far, far away",
  "Amongst magical creatures",
  "Spellbound by enchantment",
  "In the realm of dreams",
  "Wandering through portals", 
  "With a twist of fate",
  "Out of the blue",
  "In a parallel universe",
  "Through the rabbit hole",
  "In a world of nonsense",
  "Beyond the ordinary", 
  "Echoes of the past"
]
const speechSynthesizer = new p5.Speech(); // The speech synthesizer
const speechRecognizer = new p5.SpeechRec(); // The speech recognizer
let backgroundImage, voiceDropdown, label, rslider, pslider; // UI
let currentStartingWords = '';
let currentAnswer = '';
let instructions = `Let's write a story together!

I will start off the sentence every time you press the Space key, and you'll finish it by talking out loud. 
But in order for me to understand you, you must begin your sentence by saying "start writing" aloud and you must always end your sentence by saying "stop".
If the sentence is not displayed after you said "stop", it means that I did not hear you properly so you need to repeat yourself again.
Whenever you feel like you're happy with the story, instead of ending the story with the usual "stop", you must end your last sentence with "story over".
You can have fun between your sentences by playing around with the different accents available as well as with setting the rate and the pitch!

Press the Enter key to start the game.`;
let instructionsVisible = true; // Flag to track if instructions are visible
let storyBeingRead = false; // Flag to track if a story is being read
let sentences = []; // Array to store the accumulated sentences

// Background image is preloaded
function preload() {
  backgroundImage = loadImage('assets/images/sky-7232494_1920.jpg');
}
/**
The setup is mostly for UI stuff (the sliders and the voice dropdown) 
but it also sets up the speech recognizer. 
*/
function setup() {
  // Set the canvas size to match the window dimensions
  createCanvas(1920, 1440);
  // Set rectangle mode to draw from the center
  rectMode(CENTER); 
  // Set up the recognizer
  speechRecognizer.continuous = true; // Make it listen continuously
  speechRecognizer.onResult = handleSpeechInput;  // Tell it the function to call on a result
  // Text properties
  push();
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);
  pop();
  // sliders:
  rslider = createSlider(10., 200., 100.);
  rslider.position(20, 60);
  rslider.mouseReleased(setRate);
  pslider = createSlider(1., 200., 100.);
  pslider.position(20, 80);
  pslider.mouseReleased(setPitch);
  //Labels 
  label = createDiv("rate");
	label.position(160, 60);
	label = createDiv("pitch");
	label.position(160, 80);
  // Set up the voice selection dropdown
  voiceDropdown = createSelect();
  voiceDropdown.position(20, 20); 
  // Show available voices
  let voices = speechSynthesizer.voices;
  for (let i = 0; i < voices.length; i++) {
      voiceDropdown.option(voices[i].name);
  }
  // Event listener for voice selection
  voiceDropdown.changed(updateVoice); 
}
/**
Makes sure that if we are at the beginning of the program, the instructions are displayed properely 
It also uses a loops to display the sentences one after another (like a coherent paragraph).
*/
function draw(){
  background(backgroundImage);
  // Display the instructions only if they are visible
  if (instructionsVisible) {
  // Draw instructions rectangle
  let instructionsWidth = min(700, width - 40); 
  let instructionsHeight = min(500, height - 40);
  let instructionsX = width / 2;
  let instructionsY = height / 2;
  fill(255, 120);
  rect(instructionsX, instructionsY, instructionsWidth, instructionsHeight, 10);
  // Text styling
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(20);
  fill(0);
  // Draw instructions text
  let textX = instructionsX;
  let textY = instructionsY;
  // Draw text within the rectangle with maxWidth and maxHeight
  text(instructions, textX, textY, instructionsWidth - 40, instructionsHeight - 40);
}
  // Display accumulated sentences as a paragraph
  for (let i = 0; i < sentences.length; i++) {
    text(sentences[i], width / 2, height / 2 + i * 40);
  }
}
// Function to update the selected voice
function updateVoice() {
  let voiceName = voiceDropdown.value();
  let voices = speechSynthesizer.voices;
  for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === voiceName) {
          speechSynthesizer.setVoice(voiceName);
          break;
      }
  }
  console.log(voiceName);
}
// Function that handles the speech input based on certain keywords that the user says
function handleSpeechInput(){
  let parts = '?';
  // Make sure there is a result
  if (speechRecognizer.resultValue) {
    // Using split() to break what the user said into two parts
    // The part before they say "Start writing" and the part after they say it
    // The after part is the continuation of the sentence.
    let toLowerCaseResult = speechRecognizer.resultString.toLowerCase();
    parts = toLowerCaseResult.split('start writing');
    if (parts.length > 1) {
      currentAnswer = parts[1];
    } 
    if (currentAnswer.includes('stop')){
      // Extract the portion of the answer before the "stop" command
      let refinedAnswer = currentAnswer.substring(0, currentAnswer.indexOf('stop')).trim();
      // Construct the full sentence using the starting words and the "refined" answer
      let fullsentence = currentStartingWords.trim() + " " + refinedAnswer;
      sentences.push(fullsentence);
      // Stop the speech recognizer so that it does not keep listening
      speechRecognizer.stop(); 
    }
    // Check if the user said "story over"
    if (currentAnswer.includes('story over')) {
      // Extract the portion of the answer before the "story over" command
      let cleanedAnswer = currentAnswer.substring(0, currentAnswer.indexOf('story over')).trim();
      // Construct the full sentence using the starting words and the  "cleaned" answer
      let fullsentence = currentStartingWords.trim() + " " + cleanedAnswer;
      sentences.push(fullsentence);
      // Call the function to read out the entire story
      readStory(); 
    }
  } 
  console.log(currentAnswer);
} 
// function that adjusts the rate of the speech synthesis
function setRate() {
  let rate = map(rslider.value(), 0, 100, -2, 2);
  speechSynthesizer.setRate(rate);
}
 // function that adjusts the pitch of the speech synthesis
 function setPitch() {
  let pitch = map(pslider.value(), 0, 100, 0, 2);
  speechSynthesizer.setPitch(pitch);
}
// Function to read the entire story
function readStory(){
  // Concatenate all sentences into a single string
  let fullStory = sentences.join('. ');
  // Read out the full story
  speechSynthesizer.speak(fullStory);
  // Stop the speech recognizer
  speechRecognizer.stop();
  // Set the flag to true to indicate that a story is being read
  storyBeingRead = true;
}  
// Function to start a new sentence 
function nextSentence(){
  currentAnswer = '';
  // A random string from the array of "words to use" is assigned to the current one 
  currentStartingWords = random(wordsToUse);
  // Trun that random string into a string! 
  let result = currentStartingWords.toString();
  // Return that result in the form of speech
  speechSynthesizer.speak(result); 
}
// function for when the user presses ENTER and SPACE 
function keyPressed() {
  if (keyCode === ENTER && instructionsVisible) {
    instructionsVisible = false; // Hide instructions when Enter key is pressed
  }
  if (keyCode === 32 && !storyBeingRead && !instructionsVisible) {
    nextSentence();
    // Restart the speech recognizer
    speechRecognizer.start();
  }
}
