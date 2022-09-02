import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: 'Initial message',
  },
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
});

export const actions = messageSlice.actions;
export const reducer = messageSlice.reducer;
