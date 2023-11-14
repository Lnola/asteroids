import { Time, DomHelpers } from './';
import { STOPWATCH_ID } from '@/shared/models/dom';

class Stopwatch {
  startTime!: number;
  elapsedTime!: Time;
  private interval!: NodeJS.Timeout;

  constructor() {
    this.elapsedTime = new Time();
    this.start();
  }

  start() {
    if (this.interval) return;
    this.startTime = this.now;
    this.interval = setInterval(this.update.bind(this), 1);
  }

  stop() {
    clearInterval(this.interval);
  }

  private get now() {
    return new Date().getTime();
  }

  private get displayTime() {
    return `Time: ${this.elapsedTime.toString()}`;
  }

  private update() {
    const elapsedMiliseconds = this.now - this.startTime;
    this.elapsedTime.setTime(elapsedMiliseconds);
    DomHelpers.setElementInnerHtml(STOPWATCH_ID, this.displayTime);
  }
}

export default Stopwatch;
