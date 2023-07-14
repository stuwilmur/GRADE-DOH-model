export const name = 'Lower school attendance';

/**
 * Calculate lower school attendance from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Attendance value
 */
export function calculate(grpc, governance) {
  const result =
    1.0 /
    (1.0 +
      Math.exp(
        -(
          0.679930922743 +
          0.11304679055 * governance.controlOfCorruption -
          0.0707268839476 * governance.ruleOfLaw +
          0.223730449682 * governance.governmentEffectiveness +
          0.109364715484 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (3.85500426861 +
              0.753438911315 * governance.controlOfCorruption -
              0.254913022991 * governance.politicalStability +
              0.104173700723 * governance.regulatoryQuality -
              0.516714762024 * governance.ruleOfLaw +
              0.709822881619 * governance.governmentEffectiveness +
              0.497976176438 * governance.voiceAndAccountability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target lower school attendance
 * from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.679930922743 +
    0.11304679055 * governance.controlOfCorruption -
    0.0707268839476 * governance.ruleOfLaw +
    0.223730449682 * governance.governmentEffectiveness +
    0.109364715484 * governance.voiceAndAccountability
  );
  const B =
    3.85500426861 +
    0.753438911315 * governance.controlOfCorruption -
    0.254913022991 * governance.politicalStability +
    0.104173700723 * governance.regulatoryQuality -
    0.516714762024 * governance.ruleOfLaw +
    0.709822881619 * governance.governmentEffectiveness +
    0.497976176438 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(1.0 / target - 1.0) / A + B);
  return result;
}
