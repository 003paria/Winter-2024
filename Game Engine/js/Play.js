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
    // Create a second group of bugs with some basic physics configuration
    this.bugs2 = this.physics.add.group({
      // Image key 
      key: 'bug2',
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 100
    });
    // Create a third group of Bugs !! 
    this.bugs3 = this.physics.add.group({
      // Image key 
      key: 'bug3',
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 200
    });

   // Initialize score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' }); 
    
    // Create a timer event to spawn bugs wiht different delay 
    this.timerEvent = this.time.addEvent({ delay: 700, callback: this.spawnBug, callbackScope: this, loop: true });

    // Create a timer event to start spawning bug2 after the delay
    this.time.delayedCall(7000, this.startSpawningBug2, [], this);
    this.time.delayedCall(1000, this.startSpawningBug3, [], this);

    // Create an array of correct keywords
    this.correctKeywords = ['if', 'else', 'byte'];

    // Initialize the typed input
    this.typedInput = '';

    // Listen for keyboard input
    this.input.keyboard.on('keydown', this.onKeyPressed, this);
  }
  
  // Function to spawn a bug
  spawnBug() {
  // Calculate the Y position randomly within the game height
  let y = Phaser.Math.Between(50, this.game.config.height - 50); 
  console.log('Bug spawned at Y:', y); 
  // Create bugs at the far left edge of the screen with the random Y position
  this.bugs.create(0, y, 'bug');
  }

  spawnBug2() {
    // Calculate the Y position randomly within the game height
    let y = Phaser.Math.Between(50, this.game.config.height - 50); 
    console.log('Bug2 spawned at Y:', y); 

      let bug2 = this.bugs2.create(0, y, 'bug2');
      this.tweens.add({
          targets: bug2,
          y: '+=100', // move down by 100
          ease: 'Power1', 
          duration: 1000,
          yoyo: true, // go back to original position
          repeat: -1 // repeat forever
      });
    
}

  spawnBug3() {
    // Calculate the Y position randomly within the game height
    let y = Phaser.Math.Between(50, this.game.config.height - 50);
    console.log('Bug3 spawned at Y:', y);

    // Create bug3 at the far left edge of the screen with the random Y position
    let bug3 = this.bugs.create(0, y, 'bug3');

    // Custom wavy movement using sine wave
    this.tweens.add({
        targets: bug3,
        y: y + 50, // Adjust the amplitude of the wave
        duration: 1000, // Duration of one wave cycle
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Move back and forth
        ease: 'Sine.easeInOut' // Use sine wave easing
    });
  }

  // Function to start spawning bug2
  startSpawningBug2() {   
    // Create a timer event for bug2 with the desired spawn interval
    this.bug2TimerEvent = this.time.addEvent({ delay: 2000, callback: this.spawnBug2, callbackScope: this, loop: true });
  }

  // Function to start spawning bug2
  startSpawningBug3() {   
    // Create a timer event for bug2 with the desired spawn interval
    this.bug3TimerEvent = this.time.addEvent({ delay: 3000, callback: this.spawnBug3, callbackScope: this, loop: true });
  }

  // Called when a key is pressed
  onKeyPressed(event) {
    // Get the typed key
    const typedKey = event.key.toLowerCase();

    // Append the typed key to the input
    this.typedInput += typedKey;
    console.log(this.typedInput)

    // Check if the typed input ends with the correct keyword "if"
    if (this.typedInput.endsWith('if')) {
      // Destroy the first bug in the group and update the score
      let bug = this.bugs.getFirstAlive();
      if (bug) {
        bug.destroy();
        this.score += 10; // Adjust the score as needed
        this.scoreText.setText(`Score: ${this.score}`);
      }
      // Clear the typed input
      this.typedInput = '';
    } else if (this.typedInput.endsWith('else')) {
      // Destroy the first bug in the group and update the score
      let bug = this.bugs2.getFirstAlive();
      if (bug) {
        bug.destroy();
        this.score += 10; // Adjust the score as needed
        this.scoreText.setText(`Score: ${this.score}`);
      }
      // Clear the typed input
      this.typedInput = '';
    } else if (this.typedInput.endsWith('hi')) {
      // Destroy the first bug in the group and update the score
      let bug = this.bugs3.getFirstAlive();
      if (bug) {
        bug.destroy();
        this.score += 10; // Adjust the score as needed
        this.scoreText.setText(`Score: ${this.score}`);
      }
      // Clear the typed input
      this.typedInput = '';
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

    this.bugs2.children.iterate(bug2 => {
      if (bug2.x >= this.game.config.width) {
        // Bug escaped! Switch to the "lose" scene
        this.scene.start('lose');
      }
    });

    this.bugs3.children.iterate(bug3 => {
      if (bug3.x >= this.game.config.width) {
        // Bug escaped! Switch to the "lose" scene
        this.scene.start('lose');
      }
    });
  }
}


