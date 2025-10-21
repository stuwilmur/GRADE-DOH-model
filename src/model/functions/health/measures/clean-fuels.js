export const name = 'Access to clean fuels';

/**
 * Calculate access to clean fuels from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Access value
 */
export function calculate(grpc, governance) {
  const result =
    100.0 /
    (1.0 +
      Math.exp(
        -(
          1.55511127478 +
          0.265790910109 * governance.controlOfCorruption -
          0.315071291181 * governance.politicalStability +
          0.151636785162 * governance.regulatoryQuality -
          0.487315267384 * governance.ruleOfLaw +
          0.330790828876 * governance.governmentEffectiveness +
          0.404068972394 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (6.17253557414 +
              0.301704182258 * governance.controlOfCorruption +
              0.194728909195 * governance.politicalStability -
              0.225270292475 * governance.regulatoryQuality +
              0.154546022443 * governance.ruleOfLaw -
              0.865272888517 * governance.governmentEffectiveness +
              0.368198713935 * governance.voiceAndAccountability)),
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target access to clean fuels
 * from the model equations
 * @param {number} target Target access value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    1.55511127478 +
    0.265790910109 * governance.controlOfCorruption -
    0.315071291181 * governance.politicalStability +
    0.151636785162 * governance.regulatoryQuality -
    0.487315267384 * governance.ruleOfLaw +
    0.330790828876 * governance.governmentEffectiveness +
    0.404068972394 * governance.voiceAndAccountability
  );
  const B =
    6.17253557414 +
    0.301704182258 * governance.controlOfCorruption +
    0.194728909195 * governance.politicalStability -
    0.225270292475 * governance.regulatoryQuality +
    0.154546022443 * governance.ruleOfLaw -
    0.865272888517 * governance.governmentEffectiveness +
    0.368198713935 * governance.voiceAndAccountability;

  const result = Math.exp(Math.log(100.0 / target - 1.0) / A + B);
  return result;
}
