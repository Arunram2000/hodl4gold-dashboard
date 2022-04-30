import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/denApi";

const eventsApiHeaders = {};
const createRequest = (url) => ({ url, headers: eventsApiHeaders });

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/events` }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => createRequest(`/`),
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
