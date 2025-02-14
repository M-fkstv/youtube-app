import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../../components/Content/Content';

const categoryState: Video[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState: categoryState,
  reducers: {
    setCategory: (_, action: PayloadAction<Video[]>) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
