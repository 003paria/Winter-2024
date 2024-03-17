class Intro extends Phaser.Scene {

  // Just sets the scene's key name
  constructor() {
    super({
      key: `intro`
    });
  }

  create() {

    // Add intro background image
    this.add.image(0, 0, 'intro').setOrigin(0);    

    // Switch to the play scene on complete
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });


  }
}