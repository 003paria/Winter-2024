/**
A  scene to display the Game Over image after 
one of the bugs finally reaches the right side of the screen. 
*/

class Lose extends Phaser.Scene {
  // Just sets the scene's key name
  constructor() {
    super({
      key: `lose`
    });
  }

  create() {
    // Add gamo over image
    this.add.image(0, 0, 'gameover').setOrigin(0);    
  }
}