import Movement, { MovementOptions } from './movement';

// LinearMovement class extends Movement to provide straightforward linear movement mechanics.
// This class handles directional movement based on key inputs for up, down, left, and right movements.
//
// Key mappings:
// - W / ArrowUp: Move Up
// - S / ArrowDown: Move Down
// - D / ArrowRight: Move Right
// - A / ArrowLeft: Move Left
class LinearMovement extends Movement {
  constructor(options: MovementOptions) {
    super(options);
  }

  // Adjusts the player's velocity based on the current key presses.
  // Sets the player's velocity in the X or Y direction based on the pressed keys.
  // When no directional keys are pressed, applies friction to gradually slow down the player.
  adjustVelocity() {
    if (this.isPressed.forward) {
      this.player.velocity.y = -this.speed; // Move Up
      this.player.velocity.x = 0;
    } else if (this.isPressed.backward) {
      this.player.velocity.y = this.speed; // Move Down
      this.player.velocity.x = 0;
    } else if (this.isPressed.left) {
      this.player.velocity.x = -this.speed; // Move Left
      this.player.velocity.y = 0;
    } else if (this.isPressed.right) {
      this.player.velocity.x = this.speed; // Move Right
      this.player.velocity.y = 0;
    } else {
      // Apply friction when no keys are pressed
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }
}

export default LinearMovement;
