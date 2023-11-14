type Time = {
  minutes: number;
  seconds: number;
};

class Stopwatch {
  startTime!: number;
  interval!: NodeJS.Timeout;

  constructor() {
    this.start();
  }

  private get now() {
    return new Date().getTime();
  }

  start() {
    if (this.interval) return;
    this.startTime = this.now;
    this.interval = setInterval(this.update.bind(this), 10);
  }

  private update() {
    const elapsedTime = this.now - this.startTime;
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    const seconds = elapsedTime / 1000;
    const displayTime = this.getDisplayTime({ minutes, seconds });
    document.getElementById('stopwatch')!.innerHTML = displayTime;
  }

  private pad(value: number) {
    return `${value < 10 ? '0' : ''}${value}`;
  }

  private getDisplayTime(time: Time) {
    return `Time: ${this.pad(time.minutes)}:${this.pad(time.seconds)}`;
  }
}

export default Stopwatch;
