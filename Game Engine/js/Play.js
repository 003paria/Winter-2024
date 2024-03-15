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
    this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.spawnBug, callbackScope: this, loop: true });
    // Listen for mouse clicks to smash bugs
  }
  
  // Spawns a bug at a random position on the screen
  spawnBug() {
    let bug = this.bugs.create(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), 'bug');
    bug.setVelocityX(-200); // Move the bug towards the left
    bug.setCollideWorldBounds(true); // Ensure the bug stays within the game world
    bug.setBounce(1); // Make the bug bounce off the boundaries
  }
  // Called when a bug is smashed
  smashBug(pointer) {
    // Check if any bugs were clicked
    let clickedBugs = this.physics.overlapPoint(pointer.x, pointer.y, this.bugs.getChildren());
    if (clickedBugs.length > 0) {
      // Destroy the first bug clicked
      clickedBugs[0].destroy();
      // Update the score
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score);
    }
  }

  // Called every frame
  update() {

  }

}

