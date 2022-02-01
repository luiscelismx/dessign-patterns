import Strategy from '../strategy';
/**
 * Strategy to update part of a document.
 */
class PartialUpdateStrategy extends Strategy {
  constructor(documentId, field, value) {
    super();
    this.documentId = documentId;
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
      requestPath: `index/_update/${this.documentId}`,
      payload: {
        doc: {
          documentId: {
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
