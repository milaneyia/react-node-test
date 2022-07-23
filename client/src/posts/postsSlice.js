import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/api/posts');
  return data;
  } catch (error) {
    alert('No se pudo obtener las entradas.');
    return rejectWithValue(error.message);
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/posts', payload);
    return data;
  } catch (error) {
    alert(error.response.data.error);
    return rejectWithValue(error.message);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/api/posts/${postId}`);
    return data;  
  } catch (error) {
    alert('Algo salío mal...');
    return rejectWithValue(error.message);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loaded: false,
    posts: [],
  },
  extraReducers (builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        const i = state.posts.findIndex(p => p.id === action.payload.id);

        if (i !== -1) {
          state.posts.splice(i, 1);
        }
      });
  },
});

export default postsSlice.reducer;
