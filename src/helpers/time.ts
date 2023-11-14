class Time {
  minutes!: number;
  seconds!: number;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
  }

  toString() {
    return `${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
  }

  setTime(milliseconds: number) {
    this.minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    this.seconds = milliseconds / 1000;
  }

  private pad(value: number) {
    return `${value < 10 ? '0' : ''}${value}`;
  }
}

export default Time;
