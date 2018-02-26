const thrift = require('thrift');
const ConvertService = require('./gen-nodejs/ConvertService');
const ttypes = require('./gen-nodejs/convert_types');
const assert = require('assert');

const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;

const IS_LOCAL = true

const HOST = IS_LOCAL ? 'localhost' : '123'


const connection = thrift.createConnection(HOST, 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  console.log(err)
  assert(false, err);
});

const client = thrift.createClient(ConvertService, connection);

const [valueStr, currenciesStr] = process.argv.slice(2)
const [from, to] = currenciesStr.split('/')

const convertRequest = new ttypes.ConvertRequest({
  value: parseFloat(valueStr),
  currencyFrom: from.toUpperCase(),
  currencyTo: to.toUpperCase()
});


client.convert(convertRequest, function(err, message) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`${convertRequest.value} ${from} = ${message.converted} ${to} (1 ${from} = ${message.rate} ${to})`)
  }
  connection.end()
});

