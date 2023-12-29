export interface Filter {
  [key: string]: Price | FilterSubKey
}

export type Price = {
  min: number
  max: number
  highest: number
}

export type FilterSubKey = {
  [subKey: string]: boolean
}
