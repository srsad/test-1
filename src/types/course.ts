export interface Currency {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
}

export interface CurrencyAggregate extends Currency {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Value: number
  Previous: number
  Discrepancies: number
  Appreciation: boolean
}

export interface Valute {
  [key: string]: Currency
}

export interface CurrencyData {
  Date: string
  PreviousDate: string
  PreviousURL: string
  Timestamp: string
  Valute: Valute
}
