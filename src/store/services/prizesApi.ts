import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/denApi";

const prizesApiHeaders = {};
const createRequest = (url) => ({ url, headers: prizesApiHeaders });

export const prizesApi = createApi({
  reducerPath: "prizesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/prize` }),
  endpoints: (builder) => ({
    getPrizes: builder.query<any[], any>({
      query: () => createRequest(`/admin/allprize`),
    }),
    getPrizesById: builder.query({
      query: (id) => createRequest(`/${id}`),
    }),
    getLeaderboard: builder.query({
      query: () => createRequest("/leaderboard"),
    }),
  }),
});

export const {
  useGetPrizesQuery,
  useGetPrizesByIdQuery,
  useGetLeaderboardQuery,
} = prizesApi;
