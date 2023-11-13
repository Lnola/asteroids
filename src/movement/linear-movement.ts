import Movement from '@/movement';
import Player from '@/player';

class LinearMovement extends Movement {
  constructor(player: Player) {
    super(player);
  }

  adjustVelocity() {
    if (this.isPressed.forward) {
      this.player.velocity.y = -this.speed;
      this.player.velocity.x = 0;
    } else if (this.isPressed.backward) {
      this.player.velocity.y = this.speed;
      this.player.velocity.x = 0;
    } else if (this.isPressed.left) {
      this.player.velocity.x = -this.speed;
      this.player.velocity.y = 0;
    } else if (this.isPressed.right) {
      this.player.velocity.x = this.speed;
      this.player.velocity.y = 0;
    } else {
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }
}

export default LinearMovement;
