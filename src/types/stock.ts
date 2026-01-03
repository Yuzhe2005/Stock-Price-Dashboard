export interface StockData {
  symbol: string;
  price: number;
  changePercent: number;
}

export interface StockAPIResponse {
  symbol: string;
  price: number;
  change?: number;
  changePercent?: number;
}

