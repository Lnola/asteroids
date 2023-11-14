import Time from './time';

class Stopwatch {
  startTime!: number;
  interval!: NodeJS.Timeout;
  elapsedTime: Time;

  constructor() {
    this.elapsedTime = new Time();
    this.start();
  }

  start() {
    if (this.interval) return;
    this.startTime = this.now;
    this.interval = setInterval(this.update.bind(this), 10);
  }

  private get now() {
    return new Date().getTime();
  }

  private update() {
    const elapsedMiliseconds = this.now - this.startTime;
    this.elapsedTime.setTime(elapsedMiliseconds);
    document.getElementById('stopwatch')!.innerHTML = this.displayTime;
  }

  private get displayTime() {
    return `Time: ${this.elapsedTime.toString()}`;
  }
}

export default Stopwatch;
