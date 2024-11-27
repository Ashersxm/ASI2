import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';
import { fetchCards, sellCard, clearSuccess } from '../../app/cardSlice';
import { Alert, Container } from '@mui/material';

const SellPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  const { items: allCards, loading, success } = useSelector((state) => state.cards);

  const [userCards, setUserCards] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    } else {
      dispatch(fetchCards()); // Fetch all cards when the user is authenticated
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    if (user && allCards.length > 0) {
      // Filter cards that belong to the user
      const filteredCards = allCards.filter((card) => user.cardList.includes(card.id));
      setUserCards(filteredCards); // Store the filtered cards
    }
  }, [user, allCards]);

  useEffect(() => {
    if (success) {
      setShowAlert(true);

      // Hide alert after 3 seconds and clear success message
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearSuccess());
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [success, dispatch]);

  const handleSell = (card_id) => {
    // Dispatch the sellCard action with the cardId and userId
    dispatch(sellCard({ card_id, user_id: user.id, store_id: 0 }));
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  if (loading) return <p>Loading cards...</p>;

  return (
    <Container>
      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <CardMarket type="sell" cards={userCards} action={handleSell} />
    </Container>
  );
};

export default SellPage;
