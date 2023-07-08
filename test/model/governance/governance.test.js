import {testData} from './data';
import * as governance from '../../../src/model/governance';

const digitsTolerance = 6;

const testData2 = testData.map((x) => {
  x.observed = governance.governanceObject(
    x.coruptionObserved,
    x.governmentEffectivenessObserved,
    x.politicalStabilityObserved,
    x.regulatoryQualityObserved,
    x.ruleOfLawObserved,
    NaN,
  );
  x.forecast = governance.governanceObject(
    x.controlOfCorruptionForecast,
    x.governmentEffectivenessForecast,
    x.politicalStabilityForecast,
    x.regulatoryQualityForecast,
    x.ruleOfLawForecast,
    NaN,
  );
  return x;
});

const measuresAndFunctions = [
  {
    name: 'Control of Corruption',
    measure: 'controlOfCorruption',
    func: governance.forecast.controlOfCorruption,
  },
  {
    name: 'Government Effectiveness',
    measure: 'governmentEffectiveness',
    func: governance.forecast.governmentEffectiveness,
  },
  {
    name: 'Political Stability',
    measure: 'politicalStability',
    func: governance.forecast.politicalStability,
  },
  {
    name: 'Regulatory Quality',
    measure: 'regulatoryQuality',
    func: governance.forecast.regulatoryQuality,
  },
  {
    name: 'Rule of Law',
    measure: 'ruleOfLaw',
    func: governance.forecast.ruleOfLaw,
  },
];

measuresAndFunctions.forEach((m) => {
  const measure = m.measure;
  const func = m.func;
  const name = m.name;

  testData2.forEach((row, i) => {
    const observedMeasure = row.observed[measure];
    const observedGrpc = row.grpcObserved;
    const observedGrpc1 = i > 0 ? testData2[i - 1].grpcObserved : null;
    const observedMeasure1 = i > 0 ? testData2[i - 1].observed[measure] : null;
    const observedMeasure2 = i > 1 ? testData2[i - 2].observed[measure] : null;
    const forecastMeasure = testData2[i].forecast[measure];
    const forecastMeasure1 = i > 0 ? testData2[i - 1].forecast[measure] : null;
    const forecastMeasure2 = i > 1 ? testData2[i - 2].forecast[measure] : null;
    const improvedGrpc = row.grpcImproved;
    const improvedGrpc1 = i > 0 ? testData2[i - 1].grpcImproved : null;
    const forecastValue = func(
      observedMeasure,
      observedMeasure1,
      observedMeasure2,
      observedGrpc,
      observedGrpc1,
      forecastMeasure1,
      forecastMeasure2,
      improvedGrpc,
      improvedGrpc1,
    );
    if (!isNaN(forecastMeasure)) {
      test(`Tests ${name} forecast at timestep ${i}`, () => {
        expect(forecastValue).toBeCloseTo(forecastMeasure, digitsTolerance);
      });
    }
  });
});
