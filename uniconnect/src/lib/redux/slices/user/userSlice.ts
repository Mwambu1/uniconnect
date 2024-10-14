import { User } from "@/lib/model/types";
import { createSlice } from "@reduxjs/toolkit";

interface CurrentUser {
  currentUser: User;
}

const initialSate: CurrentUser = {
  currentUser: {
    userId: "",
    firstName: "",
    lastName: "",
    program: "",
    password: "",
    yearOfStudy: 0,
    studentNumber: 0,
    bio: "",
    profilePictureUrl: "",
    backgroundProfile: "",
    email: "",
    school: "",
    groups: [],
    connections: [],
    pages: [],
    posts: [],
    photos: [],
    comments: [],
  },
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState: initialSate,
  reducers: {
    setUser: (state, action) => {
        state.currentUser = action.payload
    },
  },
});

export const { setUser } = userSlice.actions;
