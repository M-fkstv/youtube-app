import axios from 'axios';
import { useEffect, useState } from 'react';

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Snippet {
  title: string;
  description: string;
  thumbnails: Thumbnails;
}

export interface VideoItem {
  id: string;
  snippet: Snippet;
}

export interface YouTubeApiResponse {
  items: VideoItem[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export const Content = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<YouTubeApiResponse>(
          'https://www.googleapis.com/youtube/v3/search',
          // 'https://www.googleapis.com/youtube/v3/videoCategories',
          {
            params: {
              part: 'snippet',
              q: 'redgroup',
              type: 'video',

              // regionCode: 'BY',
              maxResults: 50,
              // id: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25',
              hl: 'ru_RU',
              order: 'viewCount',
              regionCode: 'BY',
              key: 'AIzaSyA1nY0vpP24aEBhaiTIsnJDMnnt-FgZsuo',
            },
          },
        );

        const videosData = response.data.items.map((item: VideoItem) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        }));

        setVideos(videosData);
      } catch (err) {
        console.log('🚀 ~ fetchVideos ~ err:', err);
        setError('Ошибка при загрузке видео');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='grid gap-4  grid-cols-[repeat(auto-fill,minmax(280px,1fr))] '>
      {videos.map((video) => {
        return (
          <div
            key={video.title}
            onMouseEnter={() => setHoveredVideoId(video.id)}
            onMouseLeave={() => setHoveredVideoId(null)}
          >
            {hoveredVideoId === video.id ? (
              <iframe
                className='w-full h-[250px] delay-200'
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`}
                title={video.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <img
                src={video.thumbnail}
                alt={video.title}
                className='w-full h-[250px] object-cover rounded-md transition ease-in hover:rounded-none'
              />
            )}
            <p>{video.title}</p>
          </div>
        );
      })}
    </div>
  );
};
