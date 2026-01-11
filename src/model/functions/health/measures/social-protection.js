export const name = 'Social protection';

/**
 * Calculate population with at least one social protection
 * from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Access value
 */
export function calculate(grpc, governance) {
  const result =
    100.0 /
    (1.0 +
      Math.exp(
        -(0.611213344183 + 0.164361481365 * governance.voiceAndAccountability) *
          (Math.log(grpc) -
            (7.71444244182 +
              0.799760860664 * governance.controlOfCorruption +
              0.440779040162 * governance.politicalStability -
              0.586592663312 * governance.regulatoryQuality -
              0.729156273136 * governance.governmentEffectiveness -
              0.841025766472 * governance.voiceAndAccountability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target population with
 *  at least one social protection from the model equations
 * @param {number} target Target access value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.611213344183 +
    0.164361481365 * governance.voiceAndAccountability
  );
  const B =
    7.71444244182 +
    0.799760860664 * governance.controlOfCorruption +
    0.440779040162 * governance.politicalStability -
    0.586592663312 * governance.regulatoryQuality -
    0.729156273136 * governance.governmentEffectiveness -
    0.841025766472 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(100.0 / target - 1.0) / A + B);
  return result;
}
