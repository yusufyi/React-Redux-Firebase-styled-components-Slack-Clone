import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    searchVal: '',
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    searchValue: (state, action) => {
      state.searchVal = action.payload.searchVal;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const { enterRoom } = appSlice.actions;
export const { searchValue } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const changeSelectVal = (state) => state.app.searchVal;

export default appSlice.reducer;
