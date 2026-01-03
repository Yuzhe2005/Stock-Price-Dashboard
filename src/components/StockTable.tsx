import { StockData } from '../types/stock';

interface StockTableProps {
  stocks: StockData[];
  isLoading?: boolean;
  error?: string | null;
  sortConfig?: { key: keyof StockData; direction: 'asc' | 'desc' } | null;
  onSort?: (key: keyof StockData) => void;
}

export default function StockTable({ stocks, isLoading, error, sortConfig, onSort }: StockTableProps) {
  // Format price display
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Format percentage display
  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  // Get color based on price change (green for positive, red for negative)
  const getChangeColor = (percent: number) => {
    if (percent > 0) return 'text-green-600';
    if (percent < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // Get sort icon indicator
  const getSortIcon = (key: keyof StockData) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕️';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Handle header click for sorting
  const handleHeaderClick = (key: keyof StockData) => {
    if (onSort) {
      onSort(key);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No stock data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleHeaderClick('symbol')}
            >
              <div className="flex items-center gap-2">
                Symbol
                {onSort && <span className="text-gray-400">{getSortIcon('symbol')}</span>}
              </div>
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleHeaderClick('price')}
            >
              <div className="flex items-center gap-2">
                Price
                {onSort && <span className="text-gray-400">{getSortIcon('price')}</span>}
              </div>
            </th>
            <th
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleHeaderClick('changePercent')}
            >
              <div className="flex items-center gap-2">
                % Change
                {onSort && <span className="text-gray-400">{getSortIcon('changePercent')}</span>}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-gray-900">{stock.symbol}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{formatPrice(stock.price)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-semibold ${getChangeColor(stock.changePercent)}`}>
                  {formatPercent(stock.changePercent)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

