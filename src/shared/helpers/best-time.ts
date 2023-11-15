import { DomHelpers, Stopwatch, Store, Time } from '.';
import { BEST_TIME_ID } from '@/shared/models/dom';

// Helpsers class for handling best time
class BestTimeHelpers {
  // Retrieves the best time from the store and returns it as a Time object.
  static getBestTime(bestTimeStore: Store) {
    return new Time(
      bestTimeStore.value?.minutes ?? 0,
      bestTimeStore.value?.seconds ?? 0,
    );
  }

  // Updates the best time in the store if the current stopwatch time is greater.
  static updateBestTime(bestTimeStore: Store, stopwatch: Stopwatch) {
    const bestTime = this.getBestTime(bestTimeStore);
    const currentTime = stopwatch.elapsedTime;
    // Update the store only if the current time is greater than the best time
    if (!(bestTime && currentTime.isGreaterThan(bestTime))) return;
    bestTimeStore.setValue(stopwatch.elapsedTime);
  }

  // Sets the best time label in the DOM using the best time from the store.
  static setBestTimeLabel(bestTimeStore: Store) {
    const bestTime = this.getBestTime(bestTimeStore);
    const displayBestTime = `Best time: ${bestTime.toString()}`;
    DomHelpers.setElementInnerHtml(BEST_TIME_ID, displayBestTime);
  }
}

export default BestTimeHelpers;
