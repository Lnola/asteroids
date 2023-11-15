import { Player } from '@/objects';

// Define type for MovementOptions to structure movement-related properties
export type MovementOptions = {
  player: Player;
  speed: number;
  rotationSpeed: number;
  friction: number;
};

// Abstract class Movement to be extended by specific movement implementations
abstract class Movement {
  player: Player; // The player object to which this movement will be applied
  speed: number; // Speed at which the player moves
  rotationSpeed: number; // Rate at which the player rotates
  friction: number; // Friction coefficient affecting the movement, used to slow down the player after key-release
  isPressed = { forward: false, backward: false, left: false, right: false }; // State of key presses

  constructor({ player, speed, rotationSpeed, friction }: MovementOptions) {
    this.player = player;
    this.speed = speed;
    this.rotationSpeed = rotationSpeed;
    this.friction = friction;

    // Initialize listening for keyboard inputs
    this.listenForInputs();
  }

  // Methods to be implemented by subclasses for adjusting velocity and rotation
  adjustVelocity() {}
  adjustRotation() {}

  // Sets up key event listeners to handle user input
  private listenForInputs() {
    window.addEventListener('keyup', (event) =>
      this.handleKeyEvent(event, false),
    );
    window.addEventListener('keydown', (event) =>
      this.handleKeyEvent(event, true),
    );
  }

  // Handles key events to update movement state based on user input
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

    // Apply the key press state change if the key code matches the defined keys
    const setKeyValue =
      KeySetters[event.code as KeyCode] || ((_: boolean) => {});
    setKeyValue(isPressed);
  };
}

export default Movement;
