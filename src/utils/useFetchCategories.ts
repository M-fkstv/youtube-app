import axios from 'axios';
import { useEffect, useState } from 'react';
import { Video, YouTubeApiResponse } from '../components/Content/Content';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>(['Все']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get<YouTubeApiResponse>(
        'https://www.googleapis.com/youtube/v3/videoCategories',
        {
          params: {
            // part: 'snippet',
            regionCode: 'BY',
            hl: 'ru_RU',
            key: API_KEY,
          },
        },
      );

      const categiriesData = response.data.items.map((item: Video) => {
        return item.snippet.title;
      });

      setCategories([...categories, ...new Set(categiriesData)]);
    };

    fetchVideos();
  }, []);
  return { categories, selectedCategory, setSelectedCategory };
};
