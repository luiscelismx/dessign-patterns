/* eslint-disable import/no-cycle */
import MyService from '../../services/myService';
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
    const myService = MyService.default();
    const document = await myService.getExtendedInfo(
      this.data.resource.id,
      this.data.key
    );

    const params = {
      httpMethod: 'PUT',
      requestPath: `index/_doc/${document.documentId}`,
      payload: { document },
    };
    return params;
  }
}
// eslint-disable-next-line import/prefer-default-export
export { FullUpdateStrategy };
