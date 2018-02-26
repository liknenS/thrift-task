## Thrift node js client/server application for currency convert
server hosted on DO, ip = 159.65.193.199, port = 9090

### Installation
` npm i`

### Convert
`node convert 2 usd/byn`

### Supported currencies
you can see it in [cur.js](cur.js)

### Currency rate
currency rate get from [this API](https://free.currencyconverterapi.com)

### Client Variables
client script has variable `IS_LOCAL` and `HOST`. By default `IS_LOCAL = false` and script use DO ip. If you set `IS_LOCAL = true` script will use `localhost` as `HOST`
