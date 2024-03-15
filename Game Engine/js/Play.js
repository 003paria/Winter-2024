/**

In this arcade-style game, players take on the role of a bug exterminator tasked with eliminating pesky bugs infesting a computer program. 
The bugs are represented by cartoon insects crawling around the code, and players must squash them before they cause havoc.

*/


class Play extends Phaser.Scene {

  /**
  Just sets the scene's key name
  */
  constructor() {
    super({
      key: `play`
    });
  }

  // Called when the scene start
  create() {
    // Add background image
    this.add.image(0, 0, 'background').setOrigin(0);
    // Create a group to store bugs
    this.bugs = this.physics.add.group();  
    // Initialize score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    
    // Create a timer event to spawn bugs every second
    // Listen for mouse clicks to smash bugs
  }

  // Called every frame
  update() {

  }

}

