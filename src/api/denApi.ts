import axios from "axios";

export const API_KEY = `${process.env.REACT_APP_API_KEY}`;
export const BASE_URL = `${process.env.REACT_APP_DB_URL}`;

const API = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${API_KEY}` },
});

// EVENTS API

export const getEventsApi = (account: string) =>
  API.get(`/events`, { params: { account } });

// USER API

export const getUserApi = (formData) => API.post(`/user/add_user`, formData);
export const updateUserApi = (account: string, formData) =>
  API.patch(`/user/${account}`, formData);

export const getUsername = (formData) =>
  API.get(`/user/twitter_username`, { params: { ...formData } });

// TWITTER API

export const verifyFollowingUserApi = (
  id,
  { account, task_id, task_username, username }
) =>
  API.get(
    `/api/twitter/verify_follower/${id}?account=${account}&task_id=${task_id}&username=${username}&task_username=${task_username}`
  );

export const verifyLikedTweetsApi = (
  id,
  { account, task_id, tweet_id, username }
) =>
  API.get(
    `/api/twitter/verify_user_likes/${id}?account=${account}&task_id=${task_id}&username=${username}&tweet_id=${tweet_id}`
  );

export const verifyRetweetsApi = (
  id,
  { account, task_id, tweet_id, username }
) =>
  API.get(
    `/api/twitter/verify_retweet/${id}?account=${account}&task_id=${task_id}&username=${username}&tweet_id=${tweet_id}`
  );

export const verifyTweetsApi = (
  id,
  { account, task_id, task, username, duration }
) =>
  API.get(
    `/api/twitter/verify_tweet/${id}?account=${account}&task_id=${task_id}&username=${username}&task=${task}&duration=${duration}`
  );

// DISCORD API

export const verifyDiscordMember = (id, { account, task_id, username }) =>
  API.get(
    `/api/discord/${id}?account=${account}&task_id=${task_id}&username=${username}`
  );

// TELEGRAM API

export const verifyTelegramMember = (id, { account, task_id, username }) =>
  API.get(
    `/api/telegram/${id}?account=${account}&task_id=${task_id}&username=${username}`
  );
