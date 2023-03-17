const corruption = require('./corruption.cjs');
const governmentEffectiveness = require('./government-effectiveness.cjs');
const politicalStability = require('./political-stability.cjs');
const regulatoryQuality = require('./regulatory-quality.cjs');
const ruleOfLaw = require('./rule-of-law.cjs');
const voiceAndAccountability = require('./voice-and-accountability.cjs');

const estimateCorruption = corruption.estimate;
const estimateGovernmentEffectiveness = governmentEffectiveness.estimate;
const estimatePoliticalStability = politicalStability.estimate;
const estimateRegulatoryQuality = regulatoryQuality.estimate;
const estimateRuleOfLaw = ruleOfLaw.estimate;
const estimateVoiceAndAccountability = voiceAndAccountability.estimate;

module.exports = {
  estimateCorruption,
  estimateGovernmentEffectiveness,
  estimatePoliticalStability,
  estimateRegulatoryQuality,
  estimateRuleOfLaw,
  estimateVoiceAndAccountability,
};
