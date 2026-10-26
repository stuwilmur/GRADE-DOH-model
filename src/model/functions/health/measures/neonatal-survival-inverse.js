export const name = 'Neonatal survival inverse';

/**
 * Calculate neonatal survival inverse from the model equations.
 * Neonatal survival inverse (nsi) is derived from neonatal survival
 * by the following formula:
 * nsi = 10 * ns - 900
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Neonatal survival inverse value
 */
export function calculate(grpc, governance) {
  const result =
          100 /
          (1 +
            Math.exp(
              -(
                0.442132742509 +
                0.0273863639337 * governance.controlOfCorruption -
                0.0140227554807 * governance.politicalStability +
                0.0368588954695 * governance.regulatoryQuality -
                0.0362363522733 * governance.ruleOfLaw +
                0.0518882434461 * governance.governmentEffectiveness +
                0.081985674477 * governance.voiceAndAccountability
              ) *
                (Math.log(grpc) -
                  (2.6023934309 +
                  0.555729113849 * governance.controlOfCorruption -
                  0.45918682053 * governance.politicalStability +
                  0.867300043806 * governance.voiceAndAccountability)
                ),
            )
          );

  return result;
}

/**
 * Estimate grpc necessary to achieve target neonatal survival inverse
 * from the model equations.
 * Neonatal survival inverse (si) is derived from neonatal survival (s)
 * by the following formula:
 * nsi = 10 * ns - 900
 * @param {number} target Target value of neonatal survival inverse
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.442132742509 +
                    0.0273863639337 * governance.controlOfCorruption -
                    0.0140227554807 * governance.politicalStability +
                    0.0368588954695 * governance.regulatoryQuality -
                    0.0362363522733 * governance.ruleOfLaw +
                    0.0518882434461 * governance.governmentEffectiveness +
                    0.081985674477 * governance.voiceAndAccountability
  );
  const B = 2.6023934309 +
                  0.555729113849 * governance.controlOfCorruption -
                  0.45918682053 * governance.politicalStability +
                  0.867300043806 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(100.0 / target - 1.0) / A + B);
  return result;
}

/**
 * Transform neonatal survival (s) to neonatal survival inverse (si),
 * using the formula s = 10 * ns - 900
 * @param {number} survival Neonatal survival as a percentage
 * @return {number} Neonatal survival inverse
 */
export function neonatalSurvivalToNeonatalSurvivalInverse(survival) {
  return 10 * survival - 900;
}

/**
 * Transform neonatal survival inverse (nsi) to neonatal survival (ns),
 * using the formula ns = (s + 900) / 10
 * @param {number} survivalInverse Neonatal survival inverse
 * @return {number} Neonatal survival as a percentage
 */
export function neonatalSurvivalInverseToNeonatalSurvival(survivalInverse) {
  return (survivalInverse + 900 ) / 10;
}
