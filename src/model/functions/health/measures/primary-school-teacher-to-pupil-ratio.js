export const name = 'Primary school teacher-to-pupil ratio';

/**
 * Calculate primary school teacher-to-pupil ratio
 * from the model equations
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
          0.235464224795 -
          0.00905813072628 * governance.politicalStability +
          0.033709633743 * governance.ruleOfLaw -
          0.0218140639331 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (19.7561871646 +
              0.678880371607 * governance.politicalStability -
              0.450545238623 * governance.regulatoryQuality -
              2.02637551438 * governance.ruleOfLaw +
              0.41977998279 * governance.governmentEffectiveness +
              1.13267641272 * governance.voiceAndAccountability)),
      ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target primary school
 * teacher-to-pupil ratio from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.235464224795 -
    0.00905813072628 * governance.politicalStability +
    0.033709633743 * governance.ruleOfLaw -
    0.0218140639331 * governance.voiceAndAccountability
  );
  const B =
    19.7561871646 +
    0.678880371607 * governance.politicalStability -
    0.450545238623 * governance.regulatoryQuality -
    2.02637551438 * governance.ruleOfLaw +
    0.41977998279 * governance.governmentEffectiveness +
    1.13267641272 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(1.0 / target - 1.0) / A + B);
  return result;
}
