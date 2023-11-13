import Player from '@/player';

const SPEED = 3;
const ROTATION_SPEED = 0.05;
const FRICTION = 0.97;

abstract class Movement {
  player: Player;
  speed = SPEED;
  rotationSpeed = ROTATION_SPEED;
  friction = FRICTION;
  isPressed = { w: false, s: false, a: false, d: false };

  constructor(player: Player) {
    this.player = player;
  }

  listenForInputs() {
    window.addEventListener('keyup', (event) =>
      this.handleKeyEvent(event, false),
    );
    window.addEventListener('keydown', (event) =>
      this.handleKeyEvent(event, true),
    );
  }

  adjustVelocity() {}
  adjustRotation() {}

  private handleKeyEvent = (event: KeyboardEvent, isPressed: boolean) => {
    const KeySetters = {
      KeyW: (value: boolean) => (this.isPressed.w = value),
      KeyS: (value: boolean) => (this.isPressed.s = value),
      KeyA: (value: boolean) => (this.isPressed.a = value),
      KeyD: (value: boolean) => (this.isPressed.d = value),
    };
    type KeyCode = keyof typeof KeySetters;

    const setKeyValue =
      KeySetters[event.code as KeyCode] || ((_: boolean) => {});
    setKeyValue(isPressed);
  };
}

export default Movement;
