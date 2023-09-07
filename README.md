# GRADE-DOH-model

[![npm](https://img.shields.io/npm/v/grade-doh-model)](https://www.npmjs.com/package/grade-doh-model) [![](https://data.jsdelivr.com/v1/package/npm/grade-doh-model/badge)](https://www.jsdelivr.com/package/npm/grade-doh-model)

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-92.96%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-44.89%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-96.24%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-93.15%25-brightgreen.svg?style=flat) |

## What is this?

JavaScript package implementation of the the Government Revenue And Development Estimators Determinants Of Health (GRADE-DOH) economic model.

The underlying research is documented in the following publications:

- Stephen Hall, Marisol Lopez, Stuart Murray & Bernadette O’Hare (2022) Government revenue, quality of governance and child and maternal survival, Applied Economics Letters, 29:16, 1541-1546, [DOI: 10.1080/13504851.2021.1963408](https://doi.org/10.1080/13504851.2021.1963408)
- O'Hare BA-M, Hall S. The Impact of Government Revenue on the Achievement of the Sustainable Development Goals and the Amplification Potential of Good Governance. Cent Eur J Econ Model Econom 2022;14:109–29. [DOI: 10.24425/cejeme.2022.142627](https://doi.org/10.24425/cejeme.2022.142627)

This package implements the core economic model only; it must be provided with input data.

## Model

The Government Revenue and Determinants of Health model (GRADE) provides a precise and realistic model of the relationship between government revenue and Sustainable Development Goals (SDGs).

The GRADE Model translates the impact of additional revenue into potential SDG progress – for example, to quantify the POSITIVE impact of a large taxpayer or the NEGATIVE impact of tax abuse.

See the [API documentation](./API.md).

## Testing

This repository includes a suite of unit tests created using Jest;  run the tests using `npm test`. Coverage results are reported above.

Several tests refer to various validation spreadsheets, which are to be found in [test/assets](./test/assets).

## Data

Suitable data is provided by the [GRADE-DOH-data package](https://github.com/stuwilmur/GRADE-DOH-data).

## Try it

[JSFiddle](https://jsfiddle.net/5732nc8y/3/)

[Observable](https://observablehq.com/@grade/model-user-guide)
