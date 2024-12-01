import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {id: 1, name: 'REMIXXXX'},
]
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    addUser: (state, action) => {
      console.log('in')
      state.users = [...state.users, {id: nextId, name: action.payload.name}]
      nextId += 1
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id)
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;


export default userSlice.reducer;

