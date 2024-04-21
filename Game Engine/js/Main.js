/**
Bug Buster: The Code Cleaner
Paria Jafarian 

In this game, players take on the role of a bug exterminator tasked with eliminating pesky bugs infesting a computer program. 
The bugs are represented by cartoon insects crawling around the code, and players must squash them before they cause havoc. 
There are three types of bugs and they each have a specific keyword that destroys them once it is typed.
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
  scene: [Boot, Intro, Menu, Play, Lose]
};

let game = new Phaser.Game(config);
