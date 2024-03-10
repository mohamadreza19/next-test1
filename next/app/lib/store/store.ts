import { configureStore } from '@reduxjs/toolkit';
import postsReducers from '@/app/lib/store/features/post';

const store = configureStore({
  reducer: {
    posts: postsReducers,
  },
});

export default store;
