import { fetchPosts } from "@/lib/firebase/firestore/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Posts {
    posts: any[]
}

const initialState: Posts = {
    posts: []
}

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetchPosts(); // Adjust the URL to your API endpoint
        return response.map((post: any) => ({
            ...post,
            created_at: post.created_at.toDate().toISOString() // Convert Timestamp to ISO string
        }))
    }
);

export const posts = createSlice({
    name: "postsSlice",
    initialState: initialState,
    reducers: {
        setPosts: (state, action) => {
              state.posts = action.payload;
        }
    }, extraReducers(builder) {
        builder.addCase(getPosts.fulfilled, (state,action) => {
            state.posts = action.payload
        })
    },
})

export const { setPosts } = posts.actions;