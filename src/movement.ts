import Player from '@/player';

const SPEED = 3;
const ROTATION_SPEED = 0.05;
const FRICTION = 0.97;

const keys = {
  w: { pressed: false },
  s: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

const KeySetters = {
  KeyW: (value: boolean) => (keys.w.pressed = value),
  KeyS: (value: boolean) => (keys.s.pressed = value),
  KeyA: (value: boolean) => (keys.a.pressed = value),
  KeyD: (value: boolean) => (keys.d.pressed = value),
};

type KeyCode = keyof typeof KeySetters;

class Movement {
  player: Player;
  speed = SPEED;
  rotationSpeed = ROTATION_SPEED;
  friction = FRICTION;

  constructor(player: Player) {
    this.player = player;
  }

  listenForInputs() {
    window.addEventListener('keyup', (event) => {
      const setKeyValue =
        KeySetters[event.code as KeyCode] || ((_: boolean) => {});
      setKeyValue(false);
    });

    window.addEventListener('keydown', (event) => {
      const setKeyValue =
        KeySetters[event.code as KeyCode] || ((_: boolean) => {});
      setKeyValue(true);
    });
  }

  adjustVelocity() {
    if (keys.w.pressed) {
      this.player.velocity.x = Math.cos(this.player.rotation) * this.speed;
      this.player.velocity.y = Math.sin(this.player.rotation) * this.speed;
    } else {
      this.player.velocity.x *= this.friction;
      this.player.velocity.y *= this.friction;
    }
  }

  adjustRotation() {
    if (keys.d.pressed) this.player.rotation += this.rotationSpeed;
    if (keys.a.pressed) this.player.rotation -= this.rotationSpeed;
  }
}

export default Movement;
