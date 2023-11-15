class Time {
  minutes!: number;
  seconds!: number;

  constructor(minutes = 0, seconds = 0) {
    this.minutes = minutes;
    this.seconds = seconds;
  }

  // Converts the time to a string in the format 'MM:SS.msmsms'
  toString() {
    return `${this.pad(this.minutes)}:${this.pad(this.seconds)}`;
  }

  // Sets the time based on the provided milliseconds
  setTime(milliseconds: number) {
    this.minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    this.seconds = +((milliseconds / 1000) % 60).toFixed(3);
  }

  // Compares this time object with another to see if it is greater
  isGreaterThan(other: Time) {
    return this.totalSeconds > other.totalSeconds;
  }

  // Private getter to calculate the total time in seconds
  private get totalSeconds() {
    return this.minutes * 60 + this.seconds;
  }

  // Private method to pad the time values with leading zeros if necessary
  private pad(value: number) {
    return `${value < 10 ? '0' : ''}${value}`;
  }
}

export default Time;
