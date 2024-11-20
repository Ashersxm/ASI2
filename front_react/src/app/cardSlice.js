import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [
]
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,

  reducers: {
    addCard: (state, action) => {
      console.log('in')
      state.cards = [...state.cards, {id: nextId, name: action.payload.name}]
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.id)
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;


export default cardSlice.reducer;

