# Stock Price Dashboard

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS. Displays real-time stock prices and percentage changes from the Alpha Vantage API.

🌐 **Live Demo**: [https://stock-price-dashboard-rho.vercel.app/](https://stock-price-dashboard-rho.vercel.app/)

## Features

- **Real-time Stock Data**: Fetch and display stock prices from Alpha Vantage API
- **Interactive Table**: View stock symbols, prices, and percentage changes
- **Search Functionality**: Filter stocks by symbol
- **Sortable Columns**: Click column headers to sort by symbol, price, or change percentage
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error messages for API failures
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Alpha Vantage API** - Stock data source

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Yuzhe2005/Stock-Price-Dashboard.git

# Navigate to the project directory
cd Stock-Price-Dashboard

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

Get your free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key).

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Stock-Price-Dashboard/
├── src/
│   ├── components/     # React components
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── public/             # Static assets
├── index.html          # HTML entry point
└── package.json        # Project dependencies
```

## API Configuration

This project uses the Alpha Vantage API (free tier):
- Rate limit: 25 requests per day, 1 request per second
- Endpoint: Global Quote
- Documentation: [Alpha Vantage API Docs](https://www.alphavantage.co/documentation/)

## Deployment

Deployed on Vercel. The application automatically builds and deploys on every push to the main branch.

## Author

Yuzhe(David) Wang
