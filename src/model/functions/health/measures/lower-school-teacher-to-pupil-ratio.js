export const name = 'Lower school teacher-to-pupil ratio';

/**
 * Calculate lower school teacher-to-pupil ratio 
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
			-(
			0.249125249935 - 
			0.0380480729266 * governance.regulatoryQuality -
			0.0232115856432 * governance.ruleOfLaw + 
			0.024632796074 * governance.governmentEffectiveness + 
			0.052699249015 * governance.voiceAndAccountability
			) * 
			(Math.log(grpc) - 
				(18.3150008653 - 
				0.450794543557 * governance.controlOfCorruption + 
				0.377434867789 * governance.politicalStability
				+1.67273746972 * governance.regulatoryQuality - 
				2.26693766319 * governance.voiceAndAccountability))
			 ));
  return result;
}

/**
 * Estimate grpc necessary to achieve target lower school 
 * teacher-to-pupil ratio from the model equations
 * @param {number} target Target attendance value
 * @param {object} governance Governance object
 * @return {number} Estimated government revenue per capita in USD
 */
export function invert(target, governance) {
                const A = -(
			0.249125249935 - 
			0.0380480729266 * governance.regulatoryQuality -
			0.0232115856432 * governance.ruleOfLaw + 
			0.024632796074 * governance.governmentEffectiveness + 
			0.052699249015 * governance.voiceAndAccountability
			);
                const B =
                18.3150008653 - 
		0.450794543557 * governance.controlOfCorruption + 
		0.377434867789 * governance.politicalStability
		+1.67273746972 * governance.regulatoryQuality - 
		2.26693766319 * governance.voiceAndAccountability;
                const result = Math.exp(Math.log(1.0 / target - 1.0) / A + B);
                return result;
}
