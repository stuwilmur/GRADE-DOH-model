# GRADE-DOH-model
JavaScript package implementation of the the Government Revenue And Development Estimators Determinants Of Health (GRADE-DOH) economic model.

The underlying research is documented in the following publications:
- Stephen Hall, Marisol Lopez, Stuart Murray & Bernadette O’Hare (2022) Government revenue, quality of governance and child and maternal survival, Applied Economics Letters, 29:16, 1541-1546, [DOI: 10.1080/13504851.2021.1963408](https://doi.org/10.1080/13504851.2021.1963408)
- O'Hare BA-M, Hall S. The Impact of Government Revenue on the Achievement of the Sustainable Development Goals and the Amplification Potential of Good Governance. Cent Eur J Econ Model Econom 2022;14:109–29. [DOI: 10.24425/cejeme.2022.142627](https://doi.org/10.24425/cejeme.2022.142627 )

## What is this?
This package implements the core economic model, and also contains the base data that is used for the calculations.

## Data pipeline

1. The origin base data database Excel workbook [BASE data 27.7.2022.xlsx](https://github.com/stuwilmur/GRADE-DOH-model/blob/main/assets/data/BASE%20data%2027.7.2022%20with%20new%20POP%20data.xlsx) was prepared by Bernadette O'Hare, using data from the WDI and UNU WIDER datasets. Detailed notes on the data sources and preparation are contained in the *Intro and data sources* sheet of the workbook.
2. The intermediary base data database Excel workbook [Base data 2022.xlsx](https://github.com/stuwilmur/GRADE-DOH-model/blob/main/assets/data/BASE%20data%202022.xlsx) was prepared by taking a copy of the origin base data database [BASE data 27.7.2022](https://github.com/stuwilmur/GRADE-DOH-model/blob/main/assets/data/BASE%20data%2027.7.2022%20with%20new%20POP%20data.xlsx), and calculating the following columns in the *2022 pop data* sheet (those with red headings):
  - INFANT SURVIVAL 
  - Number of infants surviving to 1yr
  - Maternal survival per 100,000 live births
  - Maternal survival rate %
  - U5 survival rate (per 1000 live births)
  - U5 survival %
  - Number of children surviving to five 
  - School percent
3. The base data CSV file used to drive the model [Base data 2022.csv](https://github.com/stuwilmur/GRADE-DOH-model/blob/main/src/data/BASE%20data%202022.csv) was generated from [Base data 2022.xlsx](https://github.com/stuwilmur/GRADE-DOH-model/blob/main/assets/data/BASE%20data%202022.xlsx) as follows:
  - exporting the *2022 pop data* sheet to .csv format;
  - adding the column heading `countryyearcode` to the first column;
  - replacing all instances of `#N/A` and `#VALUE!` with `NaN` using find and replace
