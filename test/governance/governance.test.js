const governance = require('../../src/governance/index.cjs');

test('checks estimateCorruption returns expected value', () => {
  expect(governance.estimateCorruption(1)).toBe(1);
});

test('checks estimateGovernmentEffectiveness returns expected value', () => {
  expect(governance.estimateGovernmentEffectiveness(1)).toBe(1);
});

test('checks estimatePoliticalStability returns expected value', () => {
  expect(governance.estimatePoliticalStability(1)).toBe(1);
});

test('checks estimateRegulatoryQuality returns expected value', () => {
  expect(governance.estimateRegulatoryQuality(1)).toBe(1);
});

test('checks estimateRuleOfLaw returns expected value', () => {
  expect(governance.estimateRuleOfLaw(1)).toBe(1);
});

test('checks estimateVoiceAndAccountability returns expected value', () => {
  expect(governance.estimateVoiceAndAccountability(1)).toBe(1);
});
