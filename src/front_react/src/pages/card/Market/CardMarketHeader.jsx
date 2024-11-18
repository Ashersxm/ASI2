import React from 'react';
import Header from '@/pages/Header';
import { Typography } from '@mui/material';

const MarketHeader = ({ type }) => {
  return (
    <div className="market-header">
      <Header></Header>
      <Typography variant="h4" component="div" gutterBottom>
      {type === 'buy' ? 'Buy Cards' : 'Sell Cards'}
    </Typography>    </div>
  );
};

export default MarketHeader;
