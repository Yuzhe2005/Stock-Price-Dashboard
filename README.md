# Stock Price Dashboard

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS. Displays real-time stock data from the S&P 500 using the Alpha Vantage API.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff)

## ✨ Features

### Core Features
- 📊 **Stock Data Table** - Display stock symbols, prices, and percentage changes
- 📱 **Responsive Design** - Fully responsive layout that works on all devices
- 🔄 **Real-time Data** - Fetch live stock data from Alpha Vantage API
- 🎨 **Modern UI** - Clean, professional interface with gradient backgrounds

### Additional Features
- 🔍 **Search Functionality** - Real-time search to filter stocks by symbol
- 📈 **Sorting** - Click column headers to sort by symbol, price, or change percentage
- ⏳ **Loading States** - Elegant loading animations and indicators
- ⚠️ **Error Handling** - Comprehensive error handling with user-friendly messages
- 📊 **Statistics Dashboard** - View total stocks, average price, and filtered results
- 🎯 **Visual Indicators** - Color-coded percentage changes (green for gains, red for losses)
- 🔄 **Manual Refresh** - One-click data refresh button

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Alpha Vantage API key ([Get one for free](https://www.alphavantage.co/support/#api-key))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stock-price-dashboard.git
   cd stock-price-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

```bash
npm run preview
```

Preview the production build locally.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable: `VITE_ALPHA_VANTAGE_API_KEY` = your API key
4. Deploy!

Vercel will automatically detect Vite and configure the build settings.

### Netlify

1. Push your code to GitHub
2. Create a new site on [Netlify](https://www.netlify.com)
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_ALPHA_VANTAGE_API_KEY` = your API key
6. Deploy!

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Configuration

### API Setup

1. **Get a free API key** from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

2. **Set environment variable**
   
   For local development, create `.env`:
   ```env
   VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```
   
   For production deployment, add the environment variable in your hosting platform's settings.

### API Limits

- **Free tier**: 5 API calls per minute, 500 calls per day
- Current configuration uses 30 stocks (allows ~16 refreshes per day)

### Stock List

The default configuration displays 30 S&P 500 stocks. To modify the stock list, edit `src/services/sp500Stocks.ts`.

## 📁 Project Structure

```
stock-price-dashboard/
├── src/
│   ├── components/
│   │   └── StockTable.tsx      # Stock table component
│   ├── services/
│   │   ├── stockAPI.ts         # API service layer
│   │   └── sp500Stocks.ts      # S&P 500 stock list
│   ├── types/
│   │   └── stock.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Alpha Vantage API** - Stock market data

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Search
Real-time search filters stocks as you type. Case-insensitive matching on stock symbols.

### Sorting
Click any column header to sort. Click again to reverse the sort order. Visual indicators (↑↓) show the current sort direction.

### Error Handling
Comprehensive error handling for API failures, network issues, and invalid responses. User-friendly error messages are displayed.

### Responsive Design
Fully responsive layout that adapts to all screen sizes - from mobile phones to desktop monitors.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing free stock market data
- [React](https://react.dev/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
