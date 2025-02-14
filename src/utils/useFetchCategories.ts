import axios from 'axios';
import { useEffect, useState } from 'react';
import { Video, YouTubeApiResponse } from '../components/Content/Content';
import { CategoryType } from '../types/types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const init = {
  title: 'Все',
  id: '',
};

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get<YouTubeApiResponse>(
        'https://www.googleapis.com/youtube/v3/videoCategories',
        {
          params: {
            regionCode: 'BY',
            hl: 'ru_RU',
            key: API_KEY,
          },
        },
      );

      const categiriesData: CategoryType[] = response.data.items.map(
        (item: Video) => {
          return { title: item.snippet.title, id: item.id };
        },
      );
      console.log(categiriesData);

      // setCategories([...categories, categiriesData]);
      setCategories([init, ...categiriesData]);
    };

    fetchVideos();
  }, []);
  return { categories, selectedCategory, setSelectedCategory };
};
