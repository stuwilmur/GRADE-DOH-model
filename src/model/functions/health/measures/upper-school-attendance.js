export const name = 'Upper school attendance';

/**
 * Calculate upper school attendance from the model equations
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
          0.469760642832 -
          0.0249360651581 * governance.politicalStability +
          0.123301081621 * governance.regulatoryQuality
        ) *
          (Math.log(grpc) -
            (5.22968033236 +
              0.236802808614 * governance.controlOfCorruption -
              0.14616763297 * governance.politicalStability -
              0.287536755867 * governance.voiceAndAccountability)),
      ));

  return result;
}

/**
 * Estimate grpc necessary to achieve target upper school attendance
 * from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
  const A = -(
    0.469760642832 -
    0.0249360651581 * governance.politicalStability +
    0.123301081621 * governance.regulatoryQuality
  );
  const B =
    5.22968033236 +
    0.236802808614 * governance.controlOfCorruption -
    0.14616763297 * governance.politicalStability -
    0.287536755867 * governance.voiceAndAccountability;
  const result = Math.exp(Math.log(1.0 / target - 1.0) / A + B);
  return result;
}
