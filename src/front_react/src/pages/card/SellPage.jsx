import React from 'react';
import CardMarket from './Market/CardMarket';

// Exemple de cartes pour la vente
const sellCards = [
  { name: 'Dragon', description: 'A powerful fire dragon', family_name: 'Fire', hp: 100, energy: 50, defense: 30, attack: 40, offer: 120 },
  { name: 'Phoenix', description: 'A mythical bird', family_name: 'Fire', hp: 120, energy: 60, defense: 40, attack: 50, offer: 180 }
];

const SellPage = () => {
  return (
    <div>
      <CardMarket type="sell" cards={sellCards} />
    </div>
  );
};

export default SellPage;
