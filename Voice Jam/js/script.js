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

// an array of words that the program will use to begin the sentence (need to add a lot more...)
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
]

// The speech synthesizer
const speechSynthesizer = new p5.Speech();
// The speech recognizer
const speechRecognizer = new p5.SpeechRec();

// The current words that will start off the sentence
let currentStartingWords = '';
let currentAnswer = '';

// Declare an array to store the accumulated sentences
let sentences = [];

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  // Set the canvas size to match the window dimensions
  createCanvas(windowWidth, windowHeight);

  // Set up the recognizer
  // Make it listen continuously. 
  speechRecognizer.continuous = true;
  // Tell it the function to call on a result
  speechRecognizer.onResult = handleSpeechInput;
  // Start it
  speechRecognizer.start();

  // Text properties
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);
}


/**
Description of draw()
*/
function draw() {
  background(230,10,30);

  // Display accumulated sentences as a paragraph
  for (let i = 0; i < sentences.length; i++) {
    text(sentences[i], width / 2, height / 2 + i * 40); // Adjust spacing
  }
}



function handleSpeechInput(){
  // Set a default that works if we don't get a useful input
  let answerConfusion = 'what??'; 
  // Make sure there is a result
  if (speechRecognizer.resultValue) {
    // Using split() to break what the user said into two parts
    // The part before they say "Start writing" and the part after they say it
    // The after part is the continuation of the sentence.
    let toLowerCaseResult = speechRecognizer.resultString.toLowerCase();
    let parts = toLowerCaseResult.split('start writing');
    if (parts.length > 1) {
      answerConfusion = parts[1];
    }
  } 
    // Convert to lowercase 
    currentAnswer = answerConfusion;
    console.log(currentAnswer);
} 

function nextSentence(){
  // A random string from the array of "words to use" is assigned to the current one 
  currentStartingWords = random(wordsToUse);
  // Trun that random string into a string! 
  let result = currentStartingWords.toString();
  // Return that result in the form of speech
  speechSynthesizer.speak(result); 
  // Add the combined sentence to the array
  sentences.push(currentStartingWords + currentAnswer);
}

function mousePressed(){
  nextSentence();
}
