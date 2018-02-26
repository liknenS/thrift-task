
struct ConvertRequest {
  1: double value,
  2: string currencyFrom,
  3: string currencyTo
}
struct ConvertResponce {
  1: double converted,
  2: double rate,
}

service ConvertService {
  ConvertResponce convert(1: ConvertRequest r)
}
