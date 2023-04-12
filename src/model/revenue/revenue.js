/**
 * Calculate updated GRPC given a base GRPC, absolute monetary increase
 * and total population
 * @param {number} grpc Base GRPC
 * @param {number} absolute Absolute monetary increase in GRPC, across
 * the total population. Must be in the same currency as base GRPC
 * @param {number} population Total population
 * @return {number} Updated GRPC
 */
function grpcFromAbsoluteIncrease(grpc, absolute, population) {
  return grpc + absolute / population;
}

/**
 * Calculate updated GRPC given a base GRPC and a per-capita monetary
 * increase in GRPC
 * @param {number} grpc Base GRPC
 * @param {number} perCapita Per-capita increase in GRPC. Must
 * be in the same currency as GRPC
 * @return {number} Updated GRPC
 */
function grpcFromPerCapitaIncrease(grpc, perCapita) {
  return grpc + perCapita;
}

/**
 * Calculate updated GRPC given a base GRPC and percentage increase
 * @param {number} grpc Base GRPC
 * @param {number} percentage Percentage increase in GRPC
 * @return {number} Updated GRPC
 */
function grpcFromPercentageIncrease(grpc, percentage) {
  return (grpc * (100 + percentage)) / 100;
}

export {
  grpcFromAbsoluteIncrease,
  grpcFromPerCapitaIncrease,
  grpcFromPercentageIncrease,
};
