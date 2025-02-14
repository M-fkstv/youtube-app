import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { YouTubeApiResponse } from '../../components/Content/Content';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const searchApi = createApi({
  reducerPath: 'search',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/youtube/v3/',
  }),

  tagTypes: ['videos'],

  endpoints: (build) => ({
    searchVideo: build.query<YouTubeApiResponse, string>({
      query: (q) => ({
        url: '/search',
        params: {
          q: q,
          part: 'snippet',
          chart: 'mostPopular',
          type: 'video',
          maxResults: 10,
          key: API_KEY,
        },
      }),

      providesTags: ['videos'],
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);

      //     dispatch(data?.items);
      //   } catch (err) {
      //     console.log('1');
      //   }
      // },
    }),
    searchVideoByCategory: build.query<YouTubeApiResponse, string>({
      query: (id) => ({
        url: '/search',
        params: {
          categoryId: id,
          // part: 'snippet',
          // chart: 'mostPopular',
          type: 'video',
          maxResults: 10,
          key: API_KEY,
        },
      }),

      providesTags: ['videos'],
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);

      //     dispatch(data?.items);
      //   } catch (err) {
      //     console.log('1');
      //   }
      // },
    }),
  }),
});

export const { useLazySearchVideoQuery, useLazySearchVideoByCategoryQuery } =
  searchApi;
