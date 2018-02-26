const thrift = require('thrift');
const request = require('request');
const cur = require('./cur');

const ConvertService = require('./gen-nodejs/ConvertService.js')

const server = thrift.createServer(ConvertService, {
  convert: function(req, result) {
    const from = req.currencyFrom.toUpperCase()
    const to = req.currencyTo.toUpperCase()
    if (cur.includes(from) && cur.includes(to)) {
      const key = `${from}_${to}`
      const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${key}`
      request(url, (err, res, body) => {
        const data = JSON.parse(body)
        console.log(data)
        const rate = data.results[key].val
        result(null, {
          converted: rate * req.value,
          rate: rate
        });
      })
    } else {
      result(new Error('Incorrect currencies'), {});
    }
  }
});

server.listen(9090);
