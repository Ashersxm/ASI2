import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch cards from the API
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

// Thunk to save a card
export const saveCard = createAsyncThunk('cards/saveCard', async (cardData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8083/card', cardData); // POST to /card
    return response.data;
  } catch (error) {
    console.error("Error saving card:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],  // Store fetched cards here
    loading: false,
    error: null,
    savedCard: null, // Store the saved card data
  },
  reducers: {},
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

      // Buy card action
      .addCase(buyCard.fulfilled, (state, action) => {
        console.log("Card bought successfully:", action.payload);
      })
      .addCase(buyCard.rejected, (state, action) => {
        console.error("Error during card purchase:", action.error.message);
        state.error = action.error.message;
      })

      // Sell card action
      .addCase(sellCard.fulfilled, (state, action) => {
        state.items = state.items.filter(card => card.id !== action.payload.id);
      })
      .addCase(sellCard.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Save card action
      .addCase(saveCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCard.fulfilled, (state, action) => {
        state.savedCard = action.payload; // Update the saved card data
        state.loading = false;
      })
      .addCase(saveCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default cardSlice.reducer;
