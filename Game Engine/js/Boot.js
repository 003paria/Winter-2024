/**

A Phaser scene to handle preloading assets before switching to the
play scene.

*/

class Boot extends Phaser.Scene {
    
  // Just sets the scene's key name
  constructor() {
    super({
      key: `boot`
    });
  }

  // Loads the image assets then switches to the play scene on completion.
  preload() {
    // Load images 
    this.load.image('bug', 'assets/images/bug.png');
    this.load.image('bug2', 'assets/images/bug2.png');
    // Load Intro image 
    this.load.image('intro', 'assets/images/intro.png' );
    // Load play background image
    this.load.image('background', 'assets/images/background1.png');  
    // Load Gameover Image
    this.load.image('gameover', 'assets/images/gameover.png');   

    // Switch to the intro scene on complete
    this.load.on(`complete`, () => {
      this.scene.start(`intro`);
    });
  }

  /**
  Nothing here, but could add a loading message for example
  */
  create() {

  }

  update() {

  }

}

