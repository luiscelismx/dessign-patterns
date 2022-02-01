/* eslint-disable import/no-cycle */
import OrderService from '../../services/orderService';
import Strategy from '../strategy';

/**
 * Strategy to full update a document.
 */
class FullUpdateStrategy extends Strategy {
  constructor(data) {
    super();
    this.data = data;
  }

  /**
   * Build the params to send to OpenSearch.
   * @returns {Promise<JSON>}
   */
  async getParams() {
    // Get summary order
    const orderService = OrderService.default();
    const order = await orderService.getExtendedOrderInfo(
      this.data.resource.id,
      this.data.projectKey
    );

    const params = {
      httpMethod: 'PUT',
      requestPath: `orders/_doc/${order.orderNumber}`,
      payload: { order },
    };
    return params;
  }
}
// eslint-disable-next-line import/prefer-default-export
export { FullUpdateStrategy };
