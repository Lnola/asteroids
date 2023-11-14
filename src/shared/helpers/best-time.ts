import { DomHelpers, Stopwatch, Store, Time } from '.';
import { BEST_TIME_ID } from '@/shared/models/dom';

class BestTimeHelpers {
  static updateBestTime(bestTimeStore: Store, stopwatch: Stopwatch) {
    const bestTime = new Time(
      bestTimeStore.value.minutes,
      bestTimeStore.value.seconds,
    );
    const currentTime = stopwatch.elapsedTime;
    if (!(bestTime && currentTime.isGreaterThan(bestTime))) return;
    bestTimeStore.setValue(stopwatch.elapsedTime);
  }

  static setBestTimeLabel(bestTimeStore: Store) {
    const bestTime = new Time(
      bestTimeStore.value?.minutes ?? 0,
      bestTimeStore.value?.seconds ?? 0,
    );
    const displayBestTime = `Best time: ${bestTime.toString()}`;
    DomHelpers.setElementInnerHtml(BEST_TIME_ID, displayBestTime);
  }
}

export default BestTimeHelpers;
