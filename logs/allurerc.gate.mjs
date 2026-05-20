import { maxFailuresRule, successRateRule } from '@allurereport/gate';

export default {
  rules: [
    maxFailuresRule({ maxFailures: 2 }),        // allow up to 2 failures
    successRateRule({ minSuccessRate: 0.9 })    // require 90% pass rate
  ]
};