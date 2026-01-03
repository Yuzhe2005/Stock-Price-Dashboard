import { StockData, StockAPIResponse } from '../types/stock';
import { getSP500DemoStocks, getSP500Stocks } from './sp500Stocks';

// Alpha Vantage API configuration
// Free tier: 5 API calls per minute, 500 calls per day
// Get your free API key at: https://www.alphavantage.co/support/#api-key
const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';

// Use S&P 500 stocks (top 5 stocks)
// Free API allows 5 calls/minute, 500 calls/day: 5 stocks = 100 refreshes/day
const DEMO_STOCKS = getSP500DemoStocks(); // Using top 5 stocks (within rate limit)

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

    // Check for rate limit message
    if (data['Note']) {
      console.error(`API rate limit reached for ${symbol}:`, data['Note']);
      return null;
    }

    const quote = data['Global Quote'];

    if (!quote || !quote['05. price']) {
      console.error(`Invalid API response for ${symbol}:`, data);
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
 * Uses sequential requests to respect API rate limit (5 calls/minute)
 */
export async function fetchMultipleStocks(symbols: string[]): Promise<StockData[]> {
  const results: StockData[] = [];
  
  // Sequential requests with delay to respect rate limit
  for (let i = 0; i < symbols.length; i++) {
    const stock = await fetchStockPrice(symbols[i]);
    if (stock) {
      results.push(stock);
    }
    
    // Add delay between requests (except for the last one)
    // 12 seconds delay = 5 requests per minute (60/5 = 12)
    if (i < symbols.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 12000)); // 12 seconds
    }
  }
  
  return results;
}

/**
 * Get default list of stock symbols
 */
export function getDefaultStocks(): string[] {
  return DEMO_STOCKS;
}


