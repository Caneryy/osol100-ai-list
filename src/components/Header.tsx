import { Typography } from '@mui/material';
import React, { useState } from 'react';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="bg-cyberpunk-darker border-b border-purple-900/20 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo ve Site İsmi */}
        <div className="flex items-center">
          <img src="/icon.jpg" alt="OSOL" className="w-8 h-8 rounded-full mr-3" />
          <Typography variant="h4" component="h1" gutterBottom align="center" 
            sx={{ 
              background: 'linear-gradient(45deg, #9c27b0 30%, #f50057 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
            OSOL 100 AI TRACKER
          </Typography>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md w-full md:w-80">
          <input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cyberpunk-dark/50 border border-purple-900/30 rounded-lg px-4 py-2 
                     text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-500/50
                     transition-colors"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
}; 