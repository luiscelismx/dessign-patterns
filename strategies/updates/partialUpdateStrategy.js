import Strategy from '../strategy';
/**
 * Strategy to update part of a document.
 */
class PartialUpdateStrategy extends Strategy {
  constructor(orderNumber, field, value) {
    super();
    this.orderNumber = orderNumber;
    this.field = field;
    this.value = value;
  }

  /**
   * Build the params to send to OpenSearch.
   * @param {JSON} message
   * @returns {Promise<JSON>}
   */
  async getParams() {
    const params = {
      httpMethod: 'POST',
      requestPath: `orders/_update/${this.orderNumber}`,
      payload: {
        doc: {
          order: {
            [`${this.field}`]: `${this.value}`,
          },
        },
      },
    };
    return params;
  }
}
// eslint-disable-next-line import/prefer-default-export
export { PartialUpdateStrategy };
