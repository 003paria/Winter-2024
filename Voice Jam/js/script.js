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

// The current words that will start off the sentence
let currentStartingWords = '';
let currentAnswer = '';
let voiceDropdown, label, rslider, pslider; // UI

// Flag to track if a story is being read
let storyBeingRead = false;
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
  speechRecognizer.continuous = true; // Make it listen continuously. 
  speechRecognizer.onResult = handleSpeechInput;  // Tell it the function to call on a result
  
  // Text properties
  textSize(30);
  textStyle(BOLD);
  textAlign(CENTER);

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

  // Populate the dropdown with available voices
  let voices = speechSynthesizer.voices;
  for (let i = 0; i < voices.length; i++) {
      voiceDropdown.option(voices[i].name);
  }
  // Event listener for voice selection
  voiceDropdown.changed(updateVoice); 
}



/**
Description of draw()
*/
function draw(){
  background(230,10,30);

  // Display accumulated sentences as a paragraph
  for (let i = 0; i < sentences.length; i++) {
    text(sentences[i], width / 2, height / 2 + i * 40); // Adjust spacing
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
      // Construct the full sentence using the starting words and the truncated answer
      let fullsentence = currentStartingWords.trim() + " " + refinedAnswer;
      sentences.push(fullsentence);

      speechRecognizer.stop(); // Stop the speech recognizer
    }

    // Check if the user said "story over"
    if (currentAnswer.includes('story over')) {
      // Extract the portion of the answer before the "stop" command
      let cleanedAnswer = currentAnswer.substring(0, currentAnswer.indexOf('story over')).trim();
      // Construct the full sentence using the starting words and the truncated answer
      let fullsentence = currentStartingWords.trim() + " " + cleanedAnswer;
      sentences.push(fullsentence);

      readStory(); // Call the function to read out the entire story
    }
  } 
    
    console.log(currentAnswer);
} 

function setRate(){
  speechSynthesizer.setRate(rslider.value()/100.);
	}
function setPitch(){
  speechSynthesizer.setPitch(pslider.value()/100.);
	}

// Function to read out the entire story
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

function nextSentence(){
  currentAnswer = '';
  // A random string from the array of "words to use" is assigned to the current one 
  currentStartingWords = random(wordsToUse);
  // Trun that random string into a string! 
  let result = currentStartingWords.toString();
  // Return that result in the form of speech
  speechSynthesizer.speak(result); 
}

// When the user clicks, go to the next sentence 
function keyPressed() {
  if (keyCode === ENTER && !storyBeingRead) {
    nextSentence();
    // Restart the speech recognizer
    speechRecognizer.start();
  }
}