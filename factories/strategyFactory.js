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
    OrderStateChanged: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.orderNumber,
        'orderState',
        this.message.orderState
      );
    },
    OrderPaymentStateChanged: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.orderNumber,
        'paymentState',
        this.message.paymentState
      );
    },
    OrderShipmentStateChanged: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.orderNumber,
        'shipmentState',
        this.message.shipmentState
      );
    },
    OrderCustomerSet: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.orderNumber,
        'customerId',
        this.message.customer.id
      );
    },
    OrderCustomerEmailSet: () => {
      return new PartialUpdateStrategy(
        this.message.resourceUserProvidedIdentifiers.orderNumber,
        'customerEmail',
        this.message.email
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
