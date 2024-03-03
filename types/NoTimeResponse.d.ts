import type { Station } from './Station';
import type { Time } from './Time';

export { NoTimeResponse };

declare global {
  type NoTimeResponseObject = Time | Station;
  type NoTimeResponse = NoTimeResponseObject[];
}
