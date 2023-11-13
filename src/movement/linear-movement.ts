import Movement from '@/movement';
import Player from '@/player';

class LinearMovement extends Movement {
  constructor(player: Player) {
    super(player);
  }

  adjustVelocity() {
    if (this.isPressed.w) {
      this.player.velocity.y = -this.speed;
      this.player.velocity.x = 0;
    } else if (this.isPressed.s) {
      this.player.velocity.y = this.speed;
      this.player.velocity.x = 0;
    } else if (this.isPressed.a) {
      this.player.velocity.x = -this.speed;
      this.player.velocity.y = 0;
    } else if (this.isPressed.d) {
      this.player.velocity.x = this.speed;
      this.player.velocity.y = 0;
    } else {
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }
}

export default LinearMovement;
