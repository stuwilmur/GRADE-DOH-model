## Packages
The GRADE is implemented in two npm packages: grade-doh-model, which implements the calculations, and grade-doh-data, which provides the base data. Since the base data is quite large, the GRADE is split in this way to provide flexibility, allowing the user to load a subset of the data (or their own data), if necessary to avoid loading the full dataset.

## Calculations
### Additional revenue to achieve target SDG coverage
The model may be used to calculate the additional revenue which is required to achieve a target SDG coverage percentage, using the target function. The `target` module exports several functions, one for each measure being targeted:

- **basicSanitation**(*coverage, data*)
- **basicWater**(*coverage, data*)
- **immunisation**(*coverage, data*)
- **maternalSurvival**(*coverage, data*) 
- **safeSanitation**(*coverage, data*) 
- **safeWater**(*coverage, data*) 
- **schoolAttendance**(*coverage, data*) 
- **underFiveSurvival**(*coverage, data*) 
- **primarySchoolAttendance**(*coverage, data*) 
- **lowerSchoolAttendance**(*coverage, data*) 
- **upperSchoolAttendance**(*coverage, data*)
- **primarySchoolTeacherToPupilRatio**(*coverage, data*)
- **lowerSchoolTeacherToPupilRatio**(*coverage, data*)
- **upperSchoolTeacherToPupilRatio**(*coverage, data*)
- **cleanFuels**(*coverage, data*)
- **electricity**(*coverage, data*)

Here, *coverage* is the target coverage percentage, and *data* is an array of base data: the calculation is performed for every row in the supplied data independently.

For example, consider the observed value of the percentage of people who had access to basic sanitation in Bangladesh in 2002, which is 26.65%. We can calculate revenue required to improve this to 27%:
```javascript
bangladesh2002 = data.filter((x) => x.countrycode == 'BGD' && x.year == 2002)
bgd02target = model.target.basicSanitation(27, bangladesh2002)
```

### Instantaneous coverage
The model can be used to calculate the long-run effect of an increase in revenue, for all SDG measures, assuming the effect were instantaneous, i.e. as if the coverage reached its long-run value immediately. This is done using

**instantaneous**(*options, data*)

where *options* is an object used to configure the calculation, and *data* is an array of base data. The calculation is performed for each row in the supplied data independently.

The expected options object properties are as follows:

- *grpcValue*: value used to specify the new government revenue per capita. Defaults to zero. The methods for specifying the exact value are as follows:
- *grpcMethod*: value of `GrpcMethod` used to specify new GRPC: from a choice of `IMPROVED_GRPC`, `ABSOLUTE_ADDITIONAL_REVENUE`, `PER_CAPITA_INCREASE`, `PERCENTAGE_INCREASE`: defaults to `PERCENTAGE_INCREASE`.
- *governanceDelta*: constant adjustment value, to be added to the observed value of each of the governance indicators. Defaults to zero.

For example, calculate the instantaneous effect of a 10% increase in GRPC, for Bangladesh in 2002, assuming no change in governance indicators:

```javascript
model.instantaneous(
    {
        grpcValue: 10, 
        grpcMethod: model.GrpcMethod.PERCENTAGE_INCREASE
        },
    bangladesh2002,
  )
```

### Forecast coverage
The model may be used to perform a forecast for a single country, over a range of years using the forecast function. The forecast proceeds in a the following way:

First, the revenue uplift is applied across the forecast period. The user specifies the revenue improvement for the starting year. Next, this improvement is converted to a percentage, and then this same percentage uplift applied across the forecast period. This is done regardless of the method chosen for specifying the increase in GRPC. If the exogenous method is chosen for calculating governance, then the revenue uplift is may be delayed by a specified number of time steps, to simulate an adjustment period during which revenue "comes on-stream". There is no such delay period when using the endogenous model.

Next, the governance indicators are forecast over the forecast period; governance is assumed to be either endogenous or exogenous: under the endogenous assumption, the governance is itself forecast from the initial observed values of the governance indicators, using the modelled dynamic adjustment equations for governance. Under the exogenous assumption, the specified constant change in governance is applied to the observed value of each indicator over every year in the forecast period.
Finally, once the governance measures have been calculated, the instantaneous coverage calculation explained above is applied, for each year, using the calculated revenues and governance.

The forecast function is of the form

**forecast**(*options, data*)
where *options* is an object with the following properties:

- *grpcValue*: GRPC value, specified in conjunction with *grpcMethod*; defaults to zero.
- *grpcMethod*: value of GrpcMethod, used together with *grpcValue*. Values are as for instantaneous calculation; defaults to `PERCENTAGE_INCREASE`.
- *grpcDelay*: delay in timesteps; defaults to 5.
- *governanceMethod*: method specified as value of GovernanceMethod, used to forecast governance, either EXOGENOUS or ENDOGENOUS; defaults to ENDOGENOUS.
- *governanceDelta*: constant adjustment value, to be added to the observed value of each of the governance indicators if using the exogenous model of governance. Defaults to zero.

For example, let us calculate the effect of a 10% per-capita increase in revenue for Afghanistan, from 2002 to 2012, applying a five-year delay to the revenue uplift, and modelling governance exogenously:

```javascript
forecast = model.forecast(
    {
        grpcValue:10,
        grpcMethod: model.GrpcMethod.PERCENTAGE_INCREASE,
        grpcDelay:5,
        governanceMethod: model.GovernanceMethod.EXOGENOUS
         }, 
    afg2002_2012)
```
