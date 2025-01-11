//for users endpoints
import { apiSlice } from "./apiSlice.js";

import { USERS_URL } from "../constants.js";

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

//creating a hook based on the above endpoints
export const { useLoginMutation } = userApiSlice;
