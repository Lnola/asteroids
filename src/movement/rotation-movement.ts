import Movement from '@/movement';
import { Options } from './movement';

class RotationMovement extends Movement {
  constructor(options: Options) {
    super(options);
  }

  adjustVelocity() {
    if (this.isPressed.forward) {
      this.player.velocity.x = Math.cos(this.player.rotation) * this.speed;
      this.player.velocity.y = Math.sin(this.player.rotation) * this.speed;
    } else {
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }

  adjustRotation() {
    if (this.isPressed.right) this.player.rotation += this.rotationSpeed;
    if (this.isPressed.left) this.player.rotation -= this.rotationSpeed;
  }
}

export default RotationMovement;
