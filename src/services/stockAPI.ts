import { StockData } from '../types/stock';
import { getSP500DemoStocks } from './sp500Stocks';

// Alpha Vantage API configuration
// Free tier: 5 API calls per minute, 500 calls per day
// Get your free API key at: https://www.alphavantage.co/support/#api-key
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';

// Use S&P 500 stocks (top 3 stocks)
// Free API allows 5 calls/minute, 500 calls/day: 3 stocks = ~166 refreshes/day
const DEMO_STOCKS = getSP500DemoStocks(); // Using top 3 stocks for reliable API calls

/**
 * Fetch stock price data for a single symbol using Alpha Vantage API
 * Only uses real API data - no mock data allowed for this project
 */
export async function fetchStockPrice(symbol: string): Promise<StockData | null> {
  try {
    // Require valid API key
    if (!ALPHA_VANTAGE_API_KEY || ALPHA_VANTAGE_API_KEY === 'demo') {
      console.error(`API key not configured for ${symbol}`);
      return null;
    }

    // Call Alpha Vantage API
    const response = await fetch(
      `${ALPHA_VANTAGE_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    if (!response.ok) {
      console.error(`API request failed for ${symbol}: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Check for API error messages
    if (data['Error Message']) {
      console.error(`API error for ${symbol}:`, data['Error Message']);
      return null;
    }

    // Check for Information field (API limit or upgrade message)
    if (data['Information']) {
      console.warn(`API information for ${symbol}:`, data['Information']);
      // Still try to parse if Global Quote exists
    }

    // Check for rate limit message
    if (data['Note']) {
      console.warn(`API rate limit reached for ${symbol}:`, data['Note']);
      return null;
    }

    const quote = data['Global Quote'];

    // Check if quote exists and has required fields
    if (!quote || Object.keys(quote).length === 0) {
      // API may return empty Global Quote object when rate limited
      console.warn(`No quote data for ${symbol} - may be rate limited`);
      return null;
    }

    const priceStr = quote['05. price'];
    if (!priceStr || priceStr === 'N/A' || priceStr === '' || priceStr.trim() === '') {
      console.warn(`Invalid price data for ${symbol}:`, priceStr);
      return null;
    }

    const price = parseFloat(quote['05. price']);
    const changePercent = parseFloat(quote['10. change percent']?.replace('%', '') || '0');

    return {
      symbol: symbol.toUpperCase(),
      price,
      changePercent
    };
  } catch (error) {
    console.error(`Error fetching stock ${symbol}:`, error);
    return null;
  }
}

/**
 * Fetch stock price data for multiple symbols
 * Uses parallel requests (3 stocks should be within rate limit)
 */
export async function fetchMultipleStocks(symbols: string[]): Promise<StockData[]> {
  const promises = symbols.map(symbol => fetchStockPrice(symbol));
  const results = await Promise.all(promises);
  return results.filter((stock): stock is StockData => stock !== null);
}

/**
 * Get default list of stock symbols
 */
export function getDefaultStocks(): string[] {
  return DEMO_STOCKS;
}


