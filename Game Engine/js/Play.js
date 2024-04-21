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
    // Create a second group of bugs
    this.bugs2 = this.physics.add.group({
      // Image key 
      key: 'bug2',
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 120
    });
    // Create a third group of Bugs
    this.bugs3 = this.physics.add.group({
      // Image key 
      key: 'bug3',
      // Set the initial velocity of the bugs to move towards the right
      velocityX: 160
    });

   // Initialize score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' }); 
    
    // Create a timer event to spawn bugs with different delay 
    this.startSpawningBug(); // Right away
    this.time.delayedCall(10000, this.startSpawningBug2, [], this); // After 10 secs
    this.time.delayedCall(15000, this.startSpawningBug3, [], this); // After 15 secs

    // Initialize the typed input
    this.typedInput = '';

    // Listen for keyboard input
    this.input.keyboard.on('keydown', this.onKeyPressed, this);
  }

  // Function to start spawning bug
  startSpawningBug(){
    this.startSpawning(1000,this.spawnBug);
  } 
  // Function to start spawning bug2
  startSpawningBug2() {   
    this.startSpawning(2000, this.spawnBug2)
  }

  // Function to start spawning bug3
  startSpawningBug3() {   
    this.startSpawning(3000, this.spawnBug3);
  }

  // Function to create time delay 
  startSpawning(delay, callback){
    this.timerEvent = this.time.addEvent({delay: delay, callback: callback, callbackScope: this, loop: true})
  }

  // Function to spawn a bug
  spawnBug() {
  // Calculate the Y position randomly within the game height
  let y = Phaser.Math.Between(50, this.game.config.height - 50); 
  console.log('Bug spawned at Y:', y); 
  // Create bugs at the far left edge of the screen with the random Y position
  this.bugs.create(0, y, 'bug');
  }

  // Function to spawn a bug2
  spawnBug2() {
    // Calculate the Y position randomly within the game height
    let y = Phaser.Math.Between(50, this.game.config.height - 50); 
    console.log('Bug2 spawned at Y:', y); 

    // Wavy Movement
    let bug2 = this.bugs2.create(0, y, 'bug2');
    this.tweens.add({
        targets: bug2,
        y: y + 100,  
        duration: 1000,
        repeat: -1, // Repeat forever
        yoyo: true, // Move back and forth
        ease: 'Power1'
    });   
}

  // Function to spawn a bug3
  spawnBug3() {
    // Calculate the Y position randomly within the game height
    let y = Phaser.Math.Between(50, this.game.config.height - 50);
    console.log('Bug3 spawned at Y:', y);

    // Create bug3 at the far left edge of the screen with the random Y position
    let bug3 = this.bugs3.create(0, y, 'bug3');

    // Wavy Movement 
    this.tweens.add({
        targets: bug3,
        y: y + 50, 
        duration: 1000, 
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Move back and forth
        ease: 'Sine.easeInOut' // Use sine wave easing
    });
  }

  // Called when a key is pressed
  onKeyPressed(event) {

    // Get the typed key
    const typedKey = event.key.toLowerCase();

    // Append the typed key to the input
    this.typedInput += typedKey;
    console.log(this.typedInput)

    if (this.typedInput.endsWith('if')) {
      // Destroy the first bug in the bugs group and update the score
      let bug = this.bugs.getFirstAlive();
      this.destroyBug(bug, 5);
    } else if (this.typedInput.endsWith('else')) {
      // Destroy the first bug in the bugs2 group and update the score
      let bug = this.bugs2.getFirstAlive();
      this.destroyBug(bug, 10);
    } else if (this.typedInput.endsWith('byte')) {
      // Destroy the first bug in the bugs3 group and update the score
      let bug = this.bugs3.getFirstAlive();
      this.destroyBug(bug, 15);
    }
  }

  // Function to destroy a bug and update the score
  destroyBug(bug, pointsGained, ){
    if (bug) {
      bug.destroy();
      this.score += pointsGained; 
      this.scoreText.setText(`Score: ${this.score}`);
    }
    // Clear the typed input
    this.typedInput = '';
  }

  // Called every frame
  update() {
    // Continuously check if bugs have reached the right side of the screen
    this.checkBug(this.bugs);
    this.checkBug(this.bugs2);
    this.checkBug(this.bugs3);
  }

  // Function to check if the bugs have reached the right side of the screen 
  checkBug(bugs){
    bugs.children.iterate(bug => {
      if (bug.x >= this.game.config.width) {
        // Bug escaped! Switch to the "lose" scene
        this.scene.start('lose');
      }
    });
  }
}



