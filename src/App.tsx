import { useState, useEffect } from 'react';
import StockTable from './components/StockTable';
import { StockData } from './types/stock';
import { fetchMultipleStocks, getDefaultStocks } from './services/stockAPI';

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof StockData; direction: 'asc' | 'desc' } | null>(null);

  // Load stock data on initial mount
  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const defaultStocks = getDefaultStocks();
      const stockData = await fetchMultipleStocks(defaultStocks);
      setStocks(stockData);
    } catch (err) {
      setError('Failed to load stock data. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort stocks based on sort configuration
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (key: keyof StockData) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Stock Price Dashboard
          </h1>
          <p className="text-gray-600">Real-time stock prices and percentage changes</p>
        </header>

        {/* Search bar and refresh button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search stock symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            onClick={loadStocks}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>

        {/* Statistics */}
        {!isLoading && stocks.length > 0 && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Total Stocks</p>
              <p className="text-2xl font-bold text-gray-900">{stocks.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(stocks.reduce((sum, s) => sum + s.price, 0) / stocks.length).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-900">{sortedStocks.length}</p>
            </div>
          </div>
        )}

        {/* Stock table */}
        <StockTable 
          stocks={sortedStocks} 
          isLoading={isLoading} 
          error={error}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {/* Sort hint */}
        {sortedStocks.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>💡 Tip: Click column headers to sort</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Stock Price Dashboard - Built with React + TypeScript + Tailwind CSS</p>
          <p className="mt-2">
            Data source: Finnhub API / Alpha Vantage API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

