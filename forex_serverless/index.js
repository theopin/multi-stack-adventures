const axios = require('axios')

const requestURL = 'https://api.exchangerate.host/latest';

const asianCurrencies = [ 'RUB', 'AFN', 'EUR', 'AMD', 'AZN', 'BHD', 'BDT', 'BTN', 'GBP', 'BND', 'KHR', 'CNY',
    'AUD', 'EUR', 'USD', 'GEL', 'HKD', 'INR', 'IDR', 'IRR', 'IQD', 'ILS', 'JPY', 'JOD', 'KZT', 'KWD', 'KGS',
    'LAK', 'LBP', 'MOP','MYR', 'MVR', 'MNT', 'MMK', 'AMD', 'NPR', 'TRY', 'KPW', 'OMR', 'PKR','ILS', 'PHP', 'QAR',
    'RUB', 'SAR', 'SGD', 'KRW', 'RUB', 'LKR', 'SYP', 'TWD', 'TJS', 'THB', 'TRY', 'TMT', 'AED', 'UZS', 'VND', 'YER'
]


async function getAsianForexData(base) {
    const rates =  await axios.get(requestURL, { params: { base } })
    const asianRates = {}
    for(const currCode in rates.data.rates){
        if (asianCurrencies.includes(currCode))
            asianRates[currCode] = rates.data.rates[currCode]
    }
    return asianRates

}

exports.handler = async (event) => {
    const response = {
      statusCode: 200,
      body: {rates: getAsianForexData('SGD')},
    }
    return response
  }



