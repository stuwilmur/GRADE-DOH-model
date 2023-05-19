import * as measures from './measures';
import {applyResidual, curry} from '../../utils';

/**
 * Forecast governance measure from the model equations
 * @param {function} governanceCalculator Function which calculates governance
 * @param {number} governanceObserved Observed governance at current timestep
 * @param {number} governanceObserved1 Observed governance at previous timestep
 * @param {number} governanceObserved2 Observed governance at timestep before
 * last
 * @param {number} grpcObserved Observed grpc at current timestep
 * @param {number} grpcObserved1 Observed grpc at previous timestep
 * @param {number} governanceForecast1 Forecast governance at previous timestep
 * @param {number} governanceForecast2 forecast governance at timestep before
 * last
 * @param {number} grpcImproved Improved grpc at current timestep
 * @param {number} grpcImproved1 Improve grpc at previous timestep
 * @return {number} Forecast governance value
 */
function forecast(
  governanceCalculator,
  governanceObserved,
  governanceObserved1,
  governanceObserved2,
  grpcObserved,
  grpcObserved1,
  governanceForecast1,
  governanceForecast2,
  grpcImproved,
  grpcImproved1,
) {
  const governanceEstimated = governanceCalculator(
    governanceObserved,
    governanceObserved1,
    governanceObserved2,
    grpcObserved,
    grpcObserved1,
  );

  const governanceForecastRaw = governanceCalculator(
    governanceObserved,
    governanceForecast1,
    governanceForecast2,
    grpcImproved,
    grpcImproved1,
  );

  const governanceForecast = applyResidual(
    governanceObserved,
    governanceEstimated,
    governanceForecastRaw,
  );

  return governanceForecast;
}

export const forecastControlOfCorruption = curry(
  forecast,
  measures.controlOfCorruption.calculate,
);
export const forecastGovernmentEffectiveness = curry(
  forecast,
  measures.governmentEffectiveness.calculate,
);
export const forecastPoliticalStability = curry(
  forecast,
  measures.politicalStability.calculate,
);
export const forecastRegulatoryQuality = curry(
  forecast,
  measures.regulatoryQuality.calculate,
);
export const forecastRuleOfLaw = curry(forecast, measures.ruleOfLaw.calculate);
export const forecastVoiceAndAccountability = curry(
  forecast,
  measures.voiceAndAccountability.calculate,
);
