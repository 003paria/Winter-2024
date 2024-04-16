/**
Bug Buster: The Code Cleaner
Paria Jafarian 

In this game, players take on the role of a bug exterminator tasked with eliminating pesky bugs infesting a computer program. 
The bugs are represented by cartoon insects crawling around the code, and players must squash them before they cause havoc. 
There are two types of bugs, one of which is slower than the other type.   
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  dom: {
    createContainer: true
},
  scene: [Boot, Intro, Play, Lose]
};

let game = new Phaser.Game(config);
