import axios from 'axios';
import { useEffect, useState } from 'react';
import { VideoItem, YouTubeApiResponse } from '../components/Content/Content';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>(['Все']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get<YouTubeApiResponse>(
        'https://www.googleapis.com/youtube/v3/videoCategories',
        {
          params: {
            part: 'snippet',
            regionCode: 'BY',
            hl: 'ru_RU',
            key: 'AIzaSyA1nY0vpP24aEBhaiTIsnJDMnnt-FgZsuo',
          },
        },
      );
      const catId = response.data.items.map((item) => {
        return item.id;
      });
      console.log('🚀 ~ fetchVideos ~ catId:', catId);
      const categiriesData = response.data.items.map((item: VideoItem) => {
        return item.snippet.title;
      });

      setCategories([...categories, ...new Set(categiriesData)]);
    };

    fetchVideos();
  }, []);
  return { categories, selectedCategory, setSelectedCategory };
};
