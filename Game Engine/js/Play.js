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
    // Create a group of bugs with some basic physics configuration
    this.bugs = this.physics.add.group({
      // Image key to use
      key: 'bug',
      // How many
      quantity: 2,
      // Collide with the "walls"
      // collideWorldBounds: true,
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 100, // Adjust velocity as needed
      // How much to they bounce when they hit something?
      bounceX: 1, // Ensure full bounce
      bounceY: 1
    });
  // Initialize score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    // Create a timer event to spawn bugs every second
    this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.spawnBug, callbackScope: this, loop: true });

    // Listen for mouse clicks to smash bugs
    this.input.on('pointerdown', this.smashBug, this);
    console.log();
  }
  
  // Function to spawn a bug
  spawnBug() {
  // Calculate the Y position randomly within the game height
  let y = Phaser.Math.Between(50, this.game.config.height - 50); // Adjust Y range as needed
  // Create a bug at the far left edge of the screen with the random Y position
  this.bug = this.bugs.create(0, y, 'bug');
  }

  // Called when a bug is smashed
  smashBug(pointer) {
    this.bugs.children.iterate(bug => {
        if (bug && bug.getBounds && Phaser.Geom.Rectangle.ContainsPoint(bug.getBounds(), pointer)) {
            bug.destroy();
            this.score += 1;
            this.scoreText.setText('Score: ' + this.score);
        }
    });
    console.log();
}



  // Called every frame
  update() {
    // Check if any bugs have reached the left side of the screen
    if (this.bugs.getChildren().some(bug => bug.getBounds().right <= 0)) {
      // If so, end the game
      this.gameOver();
    }
  }

  // Ends the game
  gameOver() {
    // Stop spawning bugs
    this.timerEvent.remove();
    // Pause physics simulation
    this.physics.pause();
    // Display game over text
    this.add.text(300, 250, 'Game Over', { fontSize: '64px', fill: '#FFF' });
  }
}


