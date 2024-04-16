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
    // Add background image
    this.add.image(0, 0, 'background').setOrigin(0);

    // Create a group of bugs with some basic physics configuration
    this.bugs = this.physics.add.group({
      // Image key 
      key: 'bug',
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 100
    });

   // Initialize score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' }); 
    
    // Create a timer event to spawn bugs every half second
    this.timerEvent = this.time.addEvent({ delay: 500, callback: this.spawnBug, callbackScope: this, loop: true });
    
    // Create a combo for the correct keyword
    this.correctCombo = this.input.keyboard.createCombo('if', { maxKeyDelay: 1000 });
    // Listen for keyboard input
    this.input.keyboard.on('keycombomatch', this.onKeywordMatch, this);
  }
  
  // Function to spawn a bug
  spawnBug() {
  // Calculate the Y position randomly within the game height
  let y = Phaser.Math.Between(50, this.game.config.height - 50); 
  console.log('Bug spawned at Y:', y); 
  // Create bugs at the far left edge of the screen with the random Y position
  this.bugs.create(0, y, 'bug');
  }


  // Called when a the typed word matches the keyword 
// Called when a the typed word matches the keyword 
onKeywordMatch() {
  // Get the matched combo from the combo object
  const typedKeyword = this.correctCombo.keyCodes.map(keyCode => String.fromCharCode(keyCode)).join('').toLowerCase();
  
  // Log the typed keyword
  console.log(`Typed keyword: ${typedKeyword}`);

  const correctKeyword = 'if'; // Replace with your chosen keyword

  // Check if the typed word matches the correct keyword
  if (typedKeyword === correctKeyword) {
    // Destroy the first bug in the group and update the score
    let bug = this.bugs.getFirstAlive();
    if (bug) {
      bug.destroy();
      this.score += 10; // Adjust the score as needed
      this.scoreText.setText(`Score: ${this.score}`);
    }
  }
}

  
  // Called every frame
  update() {
    // Continuously check if bugs have reached the right side of the screen
    this.bugs.children.iterate(bug => {
      if (bug.x >= this.game.config.width) {
        // Bug escaped! Switch to the "lose" scene
        this.scene.start('lose');
      }
    });
  }
}


