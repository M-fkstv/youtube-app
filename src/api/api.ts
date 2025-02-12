import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { YouTubeApiResponse } from '../components/Content/Content';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const videoApi = createApi({
  reducerPath: 'base',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/youtube/v3/',
  }),
  endpoints: (build) => ({
    getVideos: build.query<YouTubeApiResponse, void>({
      query: () => ({
        url: 'videos',
        params: {
          part: 'snippet, contentDetails,statistics',
          chart: 'mostPopular',
          type: 'video',
          maxResults: 10,
          hl: 'ru_RU',
          order: 'viewCount',
          videoCategoryId: '28',
          regionCode: 'RU',
          key: API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetVideosQuery } = videoApi;
