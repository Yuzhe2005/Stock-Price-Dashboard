/**
 * S&P 500 Stock Symbols
 * 
 * Note: This is a subset of S&P 500 companies (top 100 by market cap)
 * Using all 500 stocks would exceed the free API rate limit (500 calls/day)
 * 
 * For the full list, you can:
 * 1. Use this subset for demonstration (recommended)
 * 2. Replace with full 500 list if using premium API
 * 3. Implement pagination to load stocks in batches
 */

// Top 100 S&P 500 stocks by market capitalization (most popular/liquid)
export const SP500_STOCKS = [
  // Technology (科技)
  'AAPL', 'MSFT', 'NVDA', 'GOOGL', 'GOOG', 'AMZN', 'META', 'TSLA', 'AVGO', 'ORCL',
  'NFLX', 'CRM', 'AMD', 'INTC', 'ADBE', 'CSCO', 'QCOM', 'TXN', 'AMAT', 'MU',
  
  // Financial Services (金融)
  'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'SCHW', 'BLK', 'CME', 'AXP',
  
  // Healthcare (医疗)
  'UNH', 'JNJ', 'ABBV', 'LLY', 'MRK', 'TMO', 'ABT', 'DHR', 'BMY', 'AMGN',
  'CVS', 'CI', 'HUM', 'ELV', 'SYK', 'ISRG', 'ZTS', 'BSX', 'BDX', 'EW',
  
  // Consumer (消费)
  'WMT', 'COST', 'HD', 'NKE', 'SBUX', 'TGT', 'LOW', 'TJX', 'BKNG', 'MCD',
  
  // Industrial (工业)
  'BA', 'CAT', 'GE', 'HON', 'RTX', 'LMT', 'DE', 'EMR', 'ETN', 'ITW',
  
  // Energy (能源)
  'XOM', 'CVX', 'COP', 'SLB', 'EOG', 'MPC', 'PSX', 'VLO', 'OXY', 'HAL',
  
  // Communication Services (通信)
  'VZ', 'T', 'CMCSA', 'DIS', 'NFLX', 'CHTR', 'TMUS', 'FOX', 'FOXA', 'PARA',
  
  // Consumer Staples (必需消费品)
  'PG', 'KO', 'PEP', 'WMT', 'COST', 'CL', 'KMB', 'MDLZ', 'GIS', 'HSY',
  
  // Utilities (公用事业)
  'NEE', 'DUK', 'SO', 'AEP', 'SRE', 'EXC', 'XEL', 'ES', 'PEG', 'ETR',
  
  // Real Estate (房地产)
  'AMT', 'PLD', 'EQIX', 'PSA', 'WELL', 'SPG', 'DLR', 'O', 'VICI', 'CBRE',
  
  // Materials (材料)
  'LIN', 'APD', 'ECL', 'SHW', 'DD', 'FCX', 'NEM', 'PPG', 'DOW', 'VALE',
];

/**
 * Get S&P 500 stock symbols
 * @param limit - Optional limit to return only first N stocks (for API rate limit management)
 */
export function getSP500Stocks(limit?: number): string[] {
  if (limit && limit > 0) {
    return SP500_STOCKS.slice(0, limit);
  }
  return SP500_STOCKS;
}

/**
 * Get a smaller subset for demonstration (recommended for free API)
 * Returns top 5 stocks (limited by API rate limit: 5 calls/minute)
 */
export function getSP500DemoStocks(): string[] {
  return SP500_STOCKS.slice(0, 5);
}

