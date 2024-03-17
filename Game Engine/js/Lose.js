class Lose extends Phaser.Scene {

  // Just sets the scene's key name
  constructor() {
    super({
      key: `lose`
    });
  }

  create() {

    // Add intro background image
    this.add.image(0, 0, 'gameover').setOrigin(0);    
  }
}