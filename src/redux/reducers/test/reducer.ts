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

const actions = messageSlice.actions;
const reducer = messageSlice.reducer;
export const testReducer = { actions, reducer };
