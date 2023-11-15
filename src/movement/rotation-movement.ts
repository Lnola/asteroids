import Movement, { MovementOptions } from './movement';

// RotationMovement class extends Movement to provide rotation-based movement mechanics.
// This class handles both linear movement (forward) and rotational movement (left and right).
//
// Key mappings:
// - W / ArrowUp: Move forward in the direction of the current rotation
// - S / ArrowDown: No action
// - D / ArrowRight: Rotate right
// - A / ArrowLeft: Rotate left
class RotationMovement extends Movement {
  constructor(options: MovementOptions) {
    super(options);
  }

  // Adjusts the player's velocity based on current rotation and forward key press.
  adjustVelocity() {
    if (this.isPressed.forward) {
      // Calculate velocity components based on rotation angle and speed
      this.player.velocity.x = Math.cos(this.player.rotation) * this.speed;
      this.player.velocity.y = Math.sin(this.player.rotation) * this.speed;
    } else {
      // Apply friction to reduce velocity over time
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }

  // Modifies the rotation angle of the player.
  adjustRotation() {
    if (this.isPressed.right) {
      this.player.rotation += this.rotationSpeed; // Rotate right
    }
    if (this.isPressed.left) {
      this.player.rotation -= this.rotationSpeed; // Rotate left
    }
  }
}

export default RotationMovement;
