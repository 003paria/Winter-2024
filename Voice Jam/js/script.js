/**
Voice Jam : Storytelling with my computer friend 
Paria Jafarian, 40248494

This is an interactive storytelling game of sorts. 
It is not interactive in the sense of "choose your adventure" type of narratives 
but rather in sense that it is a collaboration with the program because it is pretty much treated 
as a friend that helps you write funny and nonsensical stories together.  
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
]

// The speech synthesizer
const speechSynthesizer = new p5.Speech();
// The speech recognizer
const speechRecognizer = new p5.SpeechRec();

// The current words that will start off the sentence
let currentStartingWords = '';
let currentAnswer = '';


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

  // Text defaults
  textSize(35);
  textStyle(BOLD);
  textAlign(CENTER);
}


/**
Description of draw()
*/
function draw() {
  background(230,10,30);

  // Combine currentStartingWords and currentAnswer into a single sentence
  let fullSentence = currentStartingWords + " " + currentAnswer;

  // Display the combined sentence on the canvas
  text(fullSentence, width / 2, height / 2);
}



function handleSpeechInput(){
  // Set a default that works if we don't get a useful input
  let guessedAnswer = 'what??'; 
  // Make sure there is a result
  if (speechRecognizer.resultValue) {
    // We're going to use split() to break what the user said into two parts
    // The part *before* they say "Start writing" and the part *after* they say it
    // The *after* part should be what they want to write...
    let toLowerCaseResult = speechRecognizer.resultString.toLowerCase();
    let parts = toLowerCaseResult.split('start writing');
    if (parts.length > 1) {
      guessedAnswer = parts[1];
    }
  } 
    // Convert the guess to lowercase to match the answer format
    currentAnswer = guessedAnswer;
    console.log(currentAnswer);

} 

function nextSentence(){
  // A random string from the array of "words to use" is assigned to the current one 
  currentStartingWords = random(wordsToUse);
  // Trun that random string into a string! 
  let result = currentStartingWords.toString();
  // Return that result in the form of speech
  speechSynthesizer.speak(result); 
  
}

function mousePressed(){
  nextSentence();
  
  // Add the combined sentence to the array
  sentences.push(currentStartingWords + " " + currentAnswer);
}
