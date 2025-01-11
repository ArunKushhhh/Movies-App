//setting up for RTK Query
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({
    //created a separate file for the endpoints
    //here we are providing our empty endpoints here which we will be injecting in user.js
  }),
});
