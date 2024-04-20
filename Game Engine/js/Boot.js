/**
A Phaser scene to handle preloading assets before switching to the
intro scene.
*/

class Boot extends Phaser.Scene {
  // Just sets the scene's key name
  constructor() {
    super({
      key: `boot`
    });
  }

  // Loads the image assets then switches to the intro scene on completion.
  preload() {
    // Load bug images 
    this.load.image('bug', 'assets/images/bug.png');
    this.load.image('bug2', 'assets/images/bug2.png');
    this.load.image('bug3', 'assets/images/bug31.png');
    // Load Intro image 
    this.load.image('intro', 'assets/images/intro.png' );
    // Load Play background image
    this.load.image('background', 'assets/images/background1.png');  
    // Load Gameover Image
    this.load.image('gameover', 'assets/images/gameover.png');

    // Switch to the intro scene on complete
    this.load.on(`complete`, () => {
      this.scene.start(`intro`);
    });
  }

}

