import { Status } from '@shared/types';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import fakeData from '@store/fakeData.json';

interface ServerPost {
  id: string;
  author: string;
  body: string;
  comments: [
    {
      id: string;
      comment: string;
    }
  ];
}

interface NormalizePost {
  byIds: {
    [key: string]: {
      id: string;
      auther: string;
      body: string;
      comments: string[];
    };
  };
  allIds: string[];
}
interface NormalizeComment {
  byIds: {
    key?: {
      id: string;
      auther: string;
      comment: string;
    };
  };
  allIds: string[];
}
interface NormalizeUser {
  byIds: {
    key?: {
      username: string;
    };
  };
  allIds: string[];
}

interface InitalState {
  status: Status;
  posts: NormalizePost;
  comments: NormalizeComment;
  users: NormalizeUser;
}
const initalState: InitalState = {
  status: 'idle',
  posts: {
    byIds: {},
    allIds: [],
  },
  comments: {
    byIds: {},
    allIds: [],
  },
  users: {
    byIds: {},
    allIds: [],
  },
};

export const fetchPosts = createAsyncThunk('users/fetchUsers', async () => {
  const response = fakeData;

  return response.data;
});

const PostSlice = createSlice({
  name: 'todo',
  initialState: initalState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'loading';

      let comments: NormalizeComment = { allIds: [], byIds: {} };
      let users: NormalizeUser = {
        allIds: [],
        byIds: {},
      };
      const unNormalizedData: any = action.payload;

      unNormalizedData.forEach((postArg: ServerPost) => {
        state.posts = {
          ...state.posts,
          byIds: {
            ...state.posts.byIds,
            [postArg.id]: {
              id: postArg.id,
              auther: postArg.author,
              body: postArg.body,
              comments: postArg.comments.map((c) => c.id),
            },
          },

          allIds: [...state.posts.allIds, postArg.id],
        };
        postArg.comments.forEach((commnetArg) => {
          comments = {
            ...comments,
            byIds: {
              ...comments.byIds,
              [commnetArg.id]: {
                id: commnetArg.id,
                auther: postArg.author,
                comment: commnetArg.comment,
              },
            },
            allIds: [...comments.allIds, commnetArg.id],
          };
        });

        users = {
          ...users,
          byIds: {
            ...users.byIds,
            [postArg.author]: {
              username: postArg.author,
            },
          },
          allIds: [...users.allIds, postArg.author],
        };
      });

      state.comments = comments;
      state.users = users;
      state.status = 'success';
    });
  },
});

export const getPostsStatus = (state: any): Status => state.posts.status;
export const getPosts = (state: any): NormalizePost => state.posts.posts;
export default PostSlice.reducer;
