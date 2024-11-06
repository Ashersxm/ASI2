import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';
import { fetchCardsForSale, buyCard } from '../../app/cardSlice';  // Import the buyCard action

const BuyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  const { items, loading, error } = useSelector((state) => state.cards);  // Use the updated items

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    } else {
      dispatch(fetchCardsForSale()); // Fetch cards available for sale
    }
  }, [user, router, dispatch]);

  const handleBuy = (cardId) => {
    if (user) {
      const storeId = 1; // You can adjust this logic to select the store if needed
      dispatch(buyCard({ card_id: cardId, user_id: user.id, store_id: storeId }));
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p>Error loading cards: {error}</p>;

  return (
    <div>
      <CardMarket type="buy" cards={items} action={handleBuy} /> {/* Pass handleBuy as a prop */}
    </div>
  );
};

export default BuyPage;
