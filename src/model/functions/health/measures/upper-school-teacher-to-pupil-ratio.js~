export const name = 'Upper school teacher-to-pupil ratio';

/**
 * Calculate upper school teacher-to-pupil ratio 
 * from the model equations
 * @param {number} grpc Government revenue per capita in USD
 * @param {object} governance Governance object
 * @return {number} Attendance value
 */
export function calculate(grpc, governance) {
                const result 
		= 1.0 /
		(1.0 + 
		Math.exp(
			-(0.298043732869 + 
			0.0412424811223 * governance.controlOfCorruption + 
			0.00859565812208 * governance.politicalStability - 
			0.0777401202 * governance.ruleOfLaw -
			0.0207754476388 * governance.governmentEffectiveness
			+0.0673886052541 * governance.voiceAndAccountability) *
			(Math.log(grpc) - 
				(17.0358391075 - 
				1.18785253583 * governance.controlOfCorruption +
				1.65861596332 * governance.ruleOfLaw + 
				0.85305123799*governance.governmentEffectiveness - 
				2.0226464466 * governance.voiceAndAccountability))
			));
  return result;
}

/**
 * Estimate grpc necessary to achieve target upper school 
 * teacher-to-pupil ratio from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
                const A = -(0.298043732869 + 
			0.0412424811223 * governance.controlOfCorruption + 
			0.00859565812208 * governance.politicalStability - 
			0.0777401202 * governance.ruleOfLaw-
			0.0207754476388 * governance.governmentEffectiveness
			+0.0673886052541 * governance.voiceAndAccountability
                  );
                const B =
                17.0358391075 - 
		1.18785253583 * governance.controlOfCorruption +
		1.65861596332 * governance.ruleOfLaw + 
		0.85305123799*governance.governmentEffectiveness - 
		2.0226464466 * governance.voiceAndAccountability;
                const result = Math.exp(Math.log(1.0 / _target - 1.0) / A + B);
                return result;
}
