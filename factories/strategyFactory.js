import { PartialUpdateStrategy } from '../strategies/updates/partialUpdateStrategy';
import { FullUpdateStrategy } from '../strategies/updates/fullUpdateStrategy';

/**
 * This factory generates the corresponding
 * event strategy update according to the event type
 */
export default class StrategyFactory {
  static default(message) {
    return new StrategyFactory(message);
  }

  constructor(message) {
    this.message = message;
  }

  events = {
    Event1: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.documentId,
        'event1',
        this.message.event1State
      );
    },
    Event2: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.documentId,
        'event2',
        this.message.event2State
      );
    },
    Event3: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.documentId,
        'event3',
        this.message.event3State
      );
    },  
  };

  /**
   * Returns a strategy depending on the update event type
   * @param {string} eventType - event type
   * @returns
   */
  create(eventType = 'undefined') {
    if (eventType in this.events) {
      return this.events[eventType]();
    }
    console.log(`Other event. Create full update strategy`);
    return new FullUpdateStrategy(this.message);
  }
}
