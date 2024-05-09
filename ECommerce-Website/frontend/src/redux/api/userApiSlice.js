// apiUserSlice.js

import { USERS_URL } from '../constants';
import {apiSlice} from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Exporting the hooks along with the slice
export const { useLoginMutation } = userApiSlice;


