import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';
import { fetchCards, sellCard } from '../../app/cardSlice';

const SellPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  const { items: allCards, loading, error } = useSelector((state) => state.cards);

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    } else {
      dispatch(fetchCards());  // Fetch all cards when the user is authenticated
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    if (user && allCards.length > 0) {
      // Filter cards that belong to the user
      const filteredCards = allCards.filter(card => user.cardList.includes(card.id));
      setUserCards(filteredCards);  // Store the filtered cards
    }
  }, [user, allCards]);

  const handleSell = (card_id) => {
    console.log(card_id, user.id)
    // Dispatch the sellCard action with the cardId and userId
    dispatch(sellCard({ card_id, user_id: user.id,store_id :0 }));
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p>Error loading cards: {error}</p>;

  return (
    <div>
      <CardMarket
        type="sell"
        cards={userCards}
        action={handleSell}  // Pass handleSell function to CardMarket
      />
    </div>
  );
};

export default SellPage;
