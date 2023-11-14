import { Stopwatch, Store } from '.';

class BestTimeHelper {
  static updateBestTime(bestTimeStore: Store, stopwatch: Stopwatch) {
    const bestTime = bestTimeStore.value;
    const currentTime = stopwatch.elapsedTime;
    if (bestTime && currentTime.isGreaterThan(bestTime)) return;
    bestTimeStore.setValue(stopwatch.elapsedTime);
  }
}

export default BestTimeHelper;
