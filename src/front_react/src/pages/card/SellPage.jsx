import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';

const sellCards = [
  { name: 'Dragon', description: 'A powerful fire dragon', family_name: 'Fire', hp: 100, energy: 50, defense: 30, attack: 40, offer: 120 },
  { name: 'Phoenix', description: 'A mythical bird', family_name: 'Fire', hp: 120, energy: 60, defense: 40, attack: 50, offer: 180 }
];

const SellPage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("USERRR",user)
    if (!user) {
      router.push('/forms/loginUser');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Sell Page!</h1>
      <CardMarket type="sell" cards={sellCards} />
    </div>
  );
};

export default SellPage;
