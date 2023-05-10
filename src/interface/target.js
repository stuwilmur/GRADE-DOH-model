import * as coverage from '../model/coverage';
import * as revenue from '../model/revenue';
import {curry2} from '../utils';
import {governanceObjectFromBaseObservedGovernance} from '../model/governance';

/**
 * Calculate GRPC necessary to achieve target coverage
 * @param {function} targetCoverageFunction Target coverage function
 * @param {string} coverageColumnName Name of the column of the coverage measure
 * @param {number} targetCoverage Target coverage percentage
 * @param {string} countryCode Three-letter ISO country code
 * @param {year} year Year
 * @param {array} data Base data array
 * @return {number} calculated GRPC necessary to achieve target
 * coverage.
 * The following conditions must be satisfied, or the function returns NaN:
 * 0 < observed coverage <= target coverage <= 100
 */
function calcGrpcForTargetCoverage(
  targetCoverageFunction,
  coverageColumnName,
  targetCoverage,
  countryCode,
  year,
  data,
) {
  const countryYearRow = data.find(
    (row) => row.countrycode == countryCode && row.year == year,
  );

  if (countryYearRow == undefined) {
    return NaN;
  } else {
    const observedGrpc = countryYearRow['GRpcUNUWIDER 2022'];
    const newGrpc = targetCoverageFunction(
      countryYearRow[coverageColumnName],
      observedGrpc,
      targetCoverage,
      governanceObjectFromBaseObservedGovernance(countryYearRow),
    );
    return {
      'observed grpc': observedGrpc,
      'new grpc': newGrpc,
      'percentage increase': revenue.percentageIncreaseFromNewGrpc(
        observedGrpc,
        newGrpc,
      ),
      'additional revenue per capita':
        revenue.additionalRevenuePerCapitaFromNewGrpc(observedGrpc, newGrpc),
      'absolute additional revenue':
        revenue.absoluteAdditionalRevenueFromNewGrpc(
          observedGrpc,
          newGrpc,
          countryYearRow['Pop total'],
        ),
    };
  }
}

export const calcGrpcForBasicSanitation = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetBasicSanitation,
  'People using at least basic sanitation services (% of population)',
);

export const calcGrpcForBasicWater = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetBasicWater,
  'People using at least basic drinking water services (% of population)',
);

export const calcGrpcForImmunisation = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetImmunisation,
  'Immunization, DPT (% of children ages 12-23 months)',
);

export const calcGrpcForMaternalSurvival = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetMaternalSurvival,
  'Maternal survival rate %',
);

export const calcGrpcForSafeSanitation = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetSafeSanitation,
  'People using safely managed sanitation services (% of population)',
);

export const calcGrpcForSafeWater = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetSafeWater,
  'People using at least basic drinking water services (% of population)',
);

export const calcGrpcForSchoolAttendance = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetSchoolAttendance,
  'School percent',
);

export const calcGrpcForUnderFiveSurvival = curry2(
  calcGrpcForTargetCoverage,
  coverage.targetUnderFiveSurvival,
  'U5 survival %',
);
