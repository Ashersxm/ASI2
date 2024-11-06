import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';

// Exemple de cartes pour l'achat
const buyCards = [
  { name: 'Dragon', description: 'A powerful fire dragon', family_name: 'Fire', hp: 100, energy: 50, defense: 30, attack: 40, price: 150 },
  { name: 'Phoenix', description: 'A mythical bird', family_name: 'Fire', hp: 120, energy: 60, defense: 40, attack: 50, price: 200 }
];

const router = useRouter();
const user = useSelector((state) => state.user.user);

useEffect(() => {
  console.log("USERRR",user)
  if (!user) {
    router.push('/forms/loginUser');
  }
}, [user, router]);

if (!user) {
  return <p>Loading...</p>;
}

const BuyPage = () => {
  return (
    <div>
      <CardMarket type="buy" cards={buyCards} />
    </div>
  );
};

export default BuyPage;
