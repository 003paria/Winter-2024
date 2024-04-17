/**
In this game, players take on the role of a bug exterminator tasked with eliminating pesky bugs infesting a computer program. 
The bugs are represented by cartoon insects crawling around the code, and players must squash them by typing the right keyword before they cause havoc.
*/

class Play extends Phaser.Scene {

  // Just sets the scene's key name
  constructor() {
    super({
      key: `play`
    });
  }


  // Called when the scene start
  create() {
    this.nameInput = this.add.dom(220, 300).createFromCache('form');
  }
}