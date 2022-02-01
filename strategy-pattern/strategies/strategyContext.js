/**
 * It creates an array of strategies based on the context/data, the
 * context will determine which strategies are applicable.
 *
 * It looks for specific update events to partially update a document
 * default will do a full update for complex updates.
 */
export default class StrategyContext {
  constructor() {
    this.strategy = null;
  }

  execute() {
    return this.strategy.getParams();
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }
}
