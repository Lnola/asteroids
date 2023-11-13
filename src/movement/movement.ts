import Player from '@/player';

const SPEED = 3;
const ROTATION_SPEED = 0.05;
const FRICTION = 0.97;

abstract class Movement {
  player: Player;
  speed = SPEED;
  rotationSpeed = ROTATION_SPEED;
  friction = FRICTION;
  isPressed = { forward: false, backward: false, left: false, right: false };

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
      KeyW: (value: boolean) => (this.isPressed.forward = value),
      KeyS: (value: boolean) => (this.isPressed.backward = value),
      KeyA: (value: boolean) => (this.isPressed.left = value),
      KeyD: (value: boolean) => (this.isPressed.right = value),
    };
    type KeyCode = keyof typeof KeySetters;

    const setKeyValue =
      KeySetters[event.code as KeyCode] || ((_: boolean) => {});
    setKeyValue(isPressed);
  };
}

export default Movement;
