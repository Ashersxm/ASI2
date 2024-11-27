import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all cards
export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await axios.get('http://localhost:8083/cards');
  return response.data;
});

// Thunk to fetch cards available for sale
export const fetchCardsForSale = createAsyncThunk('cards/fetchCardsForSale', async () => {
  const response = await axios.get('http://localhost:8083/store/cards_to_sell');
  return response.data;
});

// Thunk to buy a card
export const buyCard = createAsyncThunk('cards/buyCard', async ({ card_id, user_id, store_id }) => {
  try {
    const response = await axios.post('http://localhost:8083/store/buy', { card_id, user_id, store_id });
    return response.data;
  } catch (error) {
    console.error("Error buying card:", error);
    throw error;
  }
});

// Thunk to sell a card
export const sellCard = createAsyncThunk('cards/sellCard', async ({ card_id, user_id, store_id }) => {
  try {
    const response = await axios.post('http://localhost:8083/store/sell', { card_id, user_id, store_id });
    return response.data;
  } catch (error) {
    console.error("Error selling card:", error);
    throw error;
  }
});

// Thunk to save a card with description limited to 255 characters
export const saveCard = createAsyncThunk(
  'cards/saveCard',
  async (cardData, { rejectWithValue, getState }) => {
    const { cards } = getState(); // Récupère l'état actuel
    if (cards.isCardSaved) {
      return rejectWithValue("Card is already saved."); // Empêche les sauvegardes multiples
    }

    // Limite la description à 255 caractères
    const limitedDescription = cardData.description
      ? cardData.description.substring(0, 255)
      : '';

    const trimmedCardData = {
      ...cardData,
      description: limitedDescription,
    };
    console.log("trimmedCardData",trimmedCardData)

    try {
      const response = await axios.post('http://localhost:8083/card', trimmedCardData); // POST to /card
      return response.data;
    } catch (error) {
      console.error("Error saving card:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],         // Liste des cartes récupérées
    loading: false,    // État de chargement
    error: null,       // Gestion des erreurs
    savedCard: null,   // Détails de la carte sauvegardée
    success: null,     // Message de succès
    isCardSaved: false // Empêche les sauvegardes multiples
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = null; // Réinitialise le message de succès
    },
    resetCardSaved: (state) => {
      state.isCardSaved = false; // Réinitialise l'indicateur de sauvegarde
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cards actions
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch cards for sale actions
      .addCase(fetchCardsForSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardsForSale.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCardsForSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Buy card actions
      .addCase(buyCard.fulfilled, (state, action) => {
        state.success = 'Card purchased successfully!';
        state.error = null;
      })
      .addCase(buyCard.rejected, (state, action) => {
        state.error = action.error.message;
        state.success = null;
      })

      // Sell card actions
      .addCase(sellCard.fulfilled, (state, action) => {
        state.success = 'Card sold successfully!';
        state.error = null;
      })
      .addCase(sellCard.rejected, (state, action) => {
        state.error = action.error.message;
        state.success = null;
      })

      // Save card actions
      .addCase(saveCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCard.fulfilled, (state, action) => {
        state.savedCard = action.payload; // Met à jour les détails de la carte sauvegardée
        state.loading = false;
        state.isCardSaved = true; // Marque la carte comme sauvegardée
        state.success = 'The card has been successfully saved!';
      })
      .addCase(saveCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSuccess, resetCardSaved } = cardSlice.actions;
export default cardSlice.reducer;
