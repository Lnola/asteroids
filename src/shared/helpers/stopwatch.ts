import { Time, DomHelpers } from './';
import { STOPWATCH_ID } from '@/shared/models/dom';

class Stopwatch {
  startTime!: number; // Records the start time of the stopwatch
  elapsedTime!: Time; // Time object to track elapsed time
  private interval!: NodeJS.Timeout; // Interval for updating the stopwatch display

  constructor() {
    this.elapsedTime = new Time();
    this.start();
  }

  // Starts the stopwatch by setting an interval or 1 millisecond
  start() {
    if (this.interval) return;
    this.startTime = this.now;
    this.interval = setInterval(this.update.bind(this), 1);
  }

  // Stops the stopwatch by clearing the interval
  stop() {
    clearInterval(this.interval);
  }

  // Helper getter to get the current time in milliseconds
  private get now() {
    return new Date().getTime();
  }

  // Formats the elapsed time for display
  private get displayTime() {
    return `Time: ${this.elapsedTime.toString()}`;
  }

  // Updates the elapsed time and the display
  private update() {
    const elapsedMilliseconds = this.now - this.startTime;
    this.elapsedTime.setTime(elapsedMilliseconds);
    DomHelpers.setElementInnerHtml(STOPWATCH_ID, this.displayTime);
  }
}

export default Stopwatch;
