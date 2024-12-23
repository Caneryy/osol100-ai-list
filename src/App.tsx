import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Coins } from 'lucide-react';
import { useCoins } from './hooks/useCoins';
import { CoinTable } from './components/CoinTable';
import { queryClient } from './lib/queryClient';

function CoinList() {
  const { data: coins, isLoading, error } = useCoins();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        Error loading coin data. Please try again later.
      </div>
    );
  }

  return <CoinTable coins={coins ?? []} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-cyberpunk-darker">
        <header className="bg-cyberpunk-dark border-b border-purple-900/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Coins className="h-8 w-8 text-cyberpunk-purple" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-purple to-cyberpunk-accent bg-clip-text text-transparent">
                OSOL 100 AI TRACKER
              </h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-cyberpunk-dark rounded-lg border border-purple-900/30 shadow-neon-sm">
            <CoinList />
          </div>
        </main>

        <footer className="bg-cyberpunk-dark border-t border-purple-900/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-purple-400/60 text-sm">
              Data provided by CoinGecko API
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;