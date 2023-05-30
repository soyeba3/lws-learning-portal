import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;
