import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: '',
  color: '',
  free_delevery_for_delayed_order: '',
  free_delevery_time: '',
};

export const { actions: lateTimeActions, reducer: lateTimeReducer } =
  createSlice({
    name: 'lateTime',
    initialState,
    reducers: {
      set(state, { payload }) {
        state = payload;
      },
      reset() {
        return initialState;
      },
    },
  });
