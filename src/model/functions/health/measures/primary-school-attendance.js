export const name = 'Primary school attendance';

/**
 * Calculate primary school attendance from the model equations
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
          0.589328646943 +
          0.124605780877 * governance.controlOfCorruption -
          0.022521406946 * governance.politicalStability -
          0.0395534844738 * governance.regulatoryQuality -
          0.0897099747213 * governance.ruleOfLaw +
          0.155803357829 * governance.governmentEffectiveness +
          0.168729825949 * governance.voiceAndAccountability
        ) *
          (Math.log(grpc) -
            (2.19330330895 +
              1.5612672242 * governance.controlOfCorruption -
              0.763089270327 * governance.politicalStability -
              0.749356781002 * governance.ruleOfLaw +
              1.67274041346 * governance.voiceAndAccountability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target primary school attendance
 * from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.589328646943 +
    0.124605780877 * governance.controlOfCorruption -
    0.022521406946 * governance.politicalStability -
    0.0395534844738 * governance.regulatoryQuality -
    0.0897099747213 * governance.ruleOfLaw +
    0.155803357829 * governance.governmentEffectiveness +
    0.168729825949 * governance.voiceAndAccountability
  );
  const B =
    2.19330330895 +
    1.5612672242 * governance.controlOfCorruption -
    0.763089270327 * governance.politicalStability -
    0.749356781002 * governance.ruleOfLaw +
    1.67274041346 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(1.0 / target - 1.0) / A + B);
  return result;
}
