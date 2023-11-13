import Player from '@/objects/player';

export type Options = {
  player: Player;
  speed: number;
  rotationSpeed: number;
  friction: number;
};

abstract class Movement {
  player: Player;
  speed: number;
  rotationSpeed: number;
  friction: number;
  isPressed = { forward: false, backward: false, left: false, right: false };

  constructor({ player, speed, rotationSpeed, friction }: Options) {
    this.player = player;
    this.speed = speed;
    this.rotationSpeed = rotationSpeed;
    this.friction = friction;
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
      ArrowUp: (value: boolean) => (this.isPressed.forward = value),
      ArrowDown: (value: boolean) => (this.isPressed.backward = value),
      ArrowLeft: (value: boolean) => (this.isPressed.left = value),
      ArrowRight: (value: boolean) => (this.isPressed.right = value),
    };
    type KeyCode = keyof typeof KeySetters;

    const setKeyValue =
      KeySetters[event.code as KeyCode] || ((_: boolean) => {});
    setKeyValue(isPressed);
  };
}

export default Movement;
