class Time {
  minutes!: number;
  seconds!: number;

  constructor(minutes = 0, seconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
  }

  toString() {
    return `${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
  }

  setTime(milliseconds: number) {
    this.minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    this.seconds = +((milliseconds / 1000) % 60).toFixed(3);
  }

  private pad(value: number) {
    return `${value < 10 ? '0' : ''}${value}`;
  }
}

export default Time;
