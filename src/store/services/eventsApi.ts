import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "../../api/denApi";

const eventsApiHeaders = {
  Authorization: `Bearer ${API_KEY}`,
};
const createRequest = (url) => ({ url, headers: eventsApiHeaders });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/events` }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ account }) => createRequest(`/?account=${account}`),
    }),
    getEventsById: builder.query({
      query: (id) => createRequest(`/${id}`),
    }),
    getLeaderboard: builder.query({
      query: () => createRequest("/leaderboard"),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventsByIdQuery,
  useGetLeaderboardQuery,
} = eventsApi;
