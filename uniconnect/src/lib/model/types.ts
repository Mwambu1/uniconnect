import { Timestamp } from "firebase/firestore";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  program: string;
  password: string;
  yearOfStudy: number;
  studentNumber: number;
  bio: string;
  profilePictureUrl: string;
  backgroundProfile: string;
  email: string;
  school: string;
  groups: string[];
  connections: string[];
  pages: string[];
  posts: string[];
  photos: string[];
  comments: string[];
}

export interface Post {
  post_id: string,
  user_id: string;
  username: string;
  content: string;
  media_url: string[];
  created_at: Timestamp;
  like_count: number;
  love_count: number;
  celebrations_count: number;
  laugh_count: number;
  comment_count: number;
  comments_by: string[];
  liked_by: string[];
}

export interface GroupPost {
  post_id: string,
  groupId: string,
  user_id: string;
  username: string;
  content: string;
  media_url: string[];
  created_at: Timestamp;
  like_count: number;
  love_count: number;
  celebrations_count: number;
  laugh_count: number;
  comment_count: number;
  comments_by: string[];
  liked_by: string[];
}

export interface Group {
  groupId: string,
  groupName: string;
  groupDescription: string;
  members: string[],
  groupProfile: string,
  posts: string[],
  groupAdmin: string,
}
