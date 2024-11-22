import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CardMarket from './Market/CardMarket';
import { fetchCardsForSale, buyCard, clearSuccess } from '../../app/cardSlice'; 
import { Alert, Container } from '@mui/material';

const BuyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.user);
  const { items, loading, success } = useSelector((state) => state.cards);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/forms/loginUser');
    } else {
      dispatch(fetchCardsForSale());
    }
  }, [user, router, dispatch]);

  useEffect(() => {
    if (success) {
      setShowAlert(true);

      // Hide alert after 3 seconds and clear success message
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearSuccess());
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [success, dispatch]);

  const handleBuy = (cardId) => {
    if (user) {
      const storeId = 1; // Adjust logic for the store if needed
      dispatch(buyCard({ card_id: cardId, user_id: user.id, store_id: storeId }));
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  if (loading) return <p>Loading cards...</p>;

  return (
    <Container>
      {showAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <CardMarket type="buy" cards={items} action={handleBuy} />
    </Container>
  );
};

export default BuyPage;
