// Base data for Bangladesh 2002, from GRADE-DOH-DATA

/* eslint-disable max-len */
export const input = [
  {
    'countryyearcode': 'BGD2002',
    'SLE': 0,
    'countrycode': 'BGD',
    'countryname': 'Bangladesh',
    'year': 2002,
    '': 1000,
    'region': 'SAS',
    'regionname': 'South Asia',
    'incomelevel': 'LMC',
    'incomelevelname': 'Lower middle income',
    'GRxGincSC2022': 0.087992384,
    'GRxGincSC2021': 0.087992356,
    'GDP per capita (constant 2015 US$)': 687.3833,
    'Government revenue per capita (constant 2015 USD)': 60.48449501,
    'GRpc UNU WIDER': 60.48447593,
    'Pop total': 132478077,
    'Population ages 00-04, female': 8026934,
    'Population ages 00-04, male': 8364196,
    'Pop<5': 16391130,
    'Population ages 15-19, female': 7106731,
    'Population ages 20-24, female': 6449021,
    'Population ages 25-29, female': 5589988,
    'Population ages 30-34, female': 4877172,
    'Population ages 35-39, female': 4203478,
    'Population ages 40-44, female': 3173737,
    'Population ages 45-49, female': 2117135,
    'Female Pop15-49': 33517262,
    'Mortality rate, infant (per 1,000 live births)': 57,
    'INFANT SURVIVAL ': 943,
    'Number of infants surviving to 1yr': 3264587.833,
    'Birth rate, crude (per 1,000 people)': 26.132,
    'Number of births': 3461917.108,
    'Maternal mortality ratio (modeled estimate, per 100,000 live births)': 410,
    'Maternal survival per 100,000 live births': '99,590',
    'Maternal survival rate %': 99.59,
    'Mortality rate, under-5 (per 1,000 live births)': 76.5,
    'U5 survival rate (per 1000 live births)': 923.5,
    'U5 survival %': 92.35,
    'Number of children surviving to five ': 3197080.449,
    'Number of maternal deaths': 14000,
    'Number of under-five deaths': 264017,
    'School life expectancy, primary and secondary, both sexes (years)': 7.79749,
    'School percent': 45.867588232,
    // eslint-disable-next-line max-len
    'People using at least basic drinking water services (% of population)': 95.0778,
    // eslint-disable-next-line max-len
    'People using safely managed drinking water services (% of population)': 55.2464,
    'People using at least basic sanitation services (% of population)': 26.6531,
    'People using safely managed sanitation services (% of population)': 19.8244,
    'Immunization, DPT (% of children ages 12-23 months)': 83,
    'Control of Corruption: Estimate': -1.361227,
    'Government Effectiveness: Estimate': -0.6887409,
    'Political Stability and Absence of Violence/Terrorism: Estimate':
      -1.033551,
    'Regulatory Quality: Estimate': -0.9786172,
    'Rule of Law: Estimate': -0.9030272,
    'Voice and Accountability: Estimate': -0.4322205,
    'Out of school: Lower school': 0.28,
    'Out of school: Primary school': 0.1,
    'Out of school: Upper school': 0.65,
    'In school: Lower school': 0.72,
    'In school: Primary school': 0.9,
    'In school: Upper school': 0.35,
    'School age population, primary education, both sexes (number)': 15772291,
    'School age population, primary education, female (number)': 7726958,
    'School age population, primary education, male (number)': 8045333,
    'School age population, lower secondary education, both sexes (number)': 9236030,
    'School age population, lower secondary education, female (number)': 4521986,
    'School age population, lower secondary education, male (number)': 4714044,
    'School age population, upper secondary education, both sexes (number)': 11885072,
    'School age population, upper secondary education, female (number)': 5816188,
    'School age population, upper secondary education, male (number)': 6068884,
    'grpc percentage increase': 10,
  },
];

export const expectedResult = [
  {
    countryyearcode: 'BGD2002',
    countryname: 'Bangladesh',
    countrycode: 'BGD',
    'Government revenue per capita (constant 2015 USD)': 59.74,
    year: 2002,
    region: 'SAS',
    incomelevel: 'LMC',
    'People using at least basic sanitation services (% of population)': 26.65,
    'People using safely managed sanitation services (% of population)': 19.82,
    'People using at least basic drinking water services (% of population)': 95.08,
    'People using safely managed drinking water services (% of population)': 55.25,
    'Immunization, DPT (% of children ages 12-23 months)': 83,
    'School percent': 45.870000000000005,
    'U5 survival %': 92.34,
    'Maternal survival rate %': 99.59,
    'Government Effectiveness: Estimate': -0.7267,
    'Control of Corruption: Estimate': -1.4491,
    'Political Stability and Absence of Violence/Terrorism: Estimate': -1.0326,
    'Regulatory Quality: Estimate': -1.0554,
    'Rule of Law: Estimate': -0.9916,
    'Voice and Accountability: Estimate': -0.4322,
    'Pop total': 134139826,
    'Pop<5': 17278765,
    'Female Pop15-49': 34617716,
    'Number of infants surviving to 1yr': 3500808,
    'Number of births': 3757983,
    'Number of children surviving to five ': 3274243,
    'Number of under-five deaths': 284192,
    'Number of maternal deaths': 16000,
    'In school: Primary school': 0.9,
    'In school: Lower school': 0.72,
    'In school: Upper school': 0.35,
    'School age population, primary education, both sexes (number)': 15772291,
    'School age population, primary education, female (number)': 7726958,
    'School age population, primary education, male (number)': 8045333,
    'School age population, lower secondary education, both sexes (number)': 9236030,
    'School age population, lower secondary education, female (number)': 4521986,
    'School age population, lower secondary education, male (number)': 4714044,
    'School age population, upper secondary education, both sexes (number)': 11885072,
    'School age population, upper secondary education, female (number)': 5816188,
    'School age population, upper secondary education, male (number)': 6068884,
    'Maternal mortality ratio (per 100,000 live births)': 414,
    'Maternal survival per 100,000 live births': 99586,
    'U5 mortality rate(per 1,000 live births)': 76.6,
    'U5 survival rate (per 1000 live births)': 923.4,
    'Infant mortality rate (per 1000 live births)': 57,
    'Infant survival (per 1000 live births)': 943,
    'Infant survival rate%': 94.3,
    'Primary school teachers to pupils': null,
    'Primary school pupils to teachers': null,
    'Lower school teachers to pupils': 0.017261962,
    'Lower school pupils to teachers': 57.93084199,
    'Upper school teachers to pupils': 0.013575601,
    'Upper school pupils to teachers': 73.66156173,
    'grpc percentage increase': 10,
    'improved grpc': 65.714,
    'additional revenue per capita': 5.973999999999997,
    'absolute additional revenue': 801351320.5239996,
    'Control of Corruption: Improved': -1.4491,
    'Government Effectiveness: Improved': -0.7267,
    'Political Stability and Absence of Violence/Terrorism: Improved': -1.0326,
    'Rule of Law: Improved': -0.9916,
    'Regulatory Quality: Improved': -1.0554,
    'Voice and Accountability: Improved': -0.4322,
    'People using at least basic sanitation services (% of population): Improved': 26.95034767738415,
    'People with increased access to Basic sanitation (SDG 6)': 402885.8518381438,
    'Children < 5 with increased access to Basic sanitation (SDG 6)': 51896.369358165895,
    'Females 15-49 with increased access to Basic sanitation (SDG 6)': 103973.50596944221,
    'People using at least basic drinking water services (% of population): Improved': 95.25361537008186,
    'People with increased access to Basic water (SDG 6)': 232887.3553370656,
    'Children < 5 with increased access to Basic water (SDG 6)': 29998.591800325223,
    'Females 15-49 with increased access to Basic water (SDG 6)': 60101.67574728792,
    'Immunization, DPT (% of children ages 12-23 months): Improved': 83.00799469026406,
    'Number of infants immunised': 279.87875633928473,
    'Maternal survival rate %: Improved': 99.59300751416383,
    'Maternal deaths averted': 113.02187099918773,
    'Maternal deaths with additional revenue': 15886.978129000812,
    'Cost per maternal life saved': 7090232.301407917,
    'People using safely managed sanitation services (% of population): Improved': 19.828366911719705,
    'People with increased access to Safe sanitation (SDG 6)': 11223.360822385515,
    'Children < 5 with increased access to Safe sanitation (SDG 6)': 1445.6990138052367,
    'Females 15-49 with increased access to Safe sanitation (SDG 6)': 2896.4337370980948,
    'People using safely managed drinking water services (% of population): Improved': 55.182317577626534,
    'People with increased access to Safe water (SDG 6)': -90789.08360435178,
    'Children < 5 with increased access to Safe water (SDG 6)': -11694.686708218536,
    'Females 15-49 with increased access to Safe water (SDG 6)': -23430.108759166767,
    'School percent: Improved': 45.87373764927428,
    'Additional child school years': 2080.4552353691693,
    'U5 survival %: Improved': 92.35990914765367,
    'Under-5 deaths averted': 748.1823842695806,
    'Under-5 deaths with additional revenue': 283443.8176157304,
    'Cost per under-5 life saved': 1071064.1380661824,
    'In school: Primary school: Improved': 0.9061099377247656,
    'Additional children in primary education, both sexes': 96367.71578688119,
    'Additional children in primary education, female': 47211.232181879466,
    'Additional children in primary education, male': 49156.48360500172,
    'In school: Lower school: Improved': 0.7283407873593171,
    'Additional children in lower secondary education, both sexes': 77035.76227427369,
    'Additional children in lower secondary education, female': 37716.92366780898,
    'Additional children in lower secondary education, male': 39318.838606464706,
    'In school: Upper school: Improved': 0.35840810657579036,
    'Additional children in upper secondary education, both sexes': 99930.95203694166,
    'Additional children in upper secondary education, female': 48903.12856883287,
    'Additional children in upper secondary education, male': 51027.823468108785,
    'Primary school teachers to pupils: Improved': 0.0005111849071036331,
    'Primary school pupils to teachers: Improved': 0.0005111849071036331,
    'Lower school teachers to pupils: Improved': 0.01786629085930287,
    'Lower school pupils to teachers: Improved': 0.01786629085930287,
    'Upper school teachers to pupils: Improved': 0.014134047701912886,
    'Additional teachers of primary school-age children': null,
    'Additional teachers of lower school-age children': null,
    'Additional teachers of upper school-age children': NaN
  },
];
