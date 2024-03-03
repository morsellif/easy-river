import type { Point } from './Point.t';

export { TimeSeries };

declare global {
  type TimeSeries = Point[];
}
