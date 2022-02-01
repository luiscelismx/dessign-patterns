/* eslint-disable no-empty-function */
/**
 * Class that models an strategy to conform a the params object to send
 * to OpenSearch.
 */
export default class Strategy {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  getParams() {
    throw new Error(`You cannot call an abstract method!`);
  }
}
