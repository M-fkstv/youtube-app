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
  etag: string;
  snippet: Snippet;
}

export interface YouTubeApiResponse {
  items: Video[];
}

export interface Video {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: Snippet;
  // title: string;
  // thumbnail: string;
}
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const Content = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<YouTubeApiResponse>(
          'https://www.googleapis.com/youtube/v3/videos',
          // 'https://www.googleapis.com/youtube/v3/videoCategories',

          {
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
          },
        );

        const temp = response.data;

        console.log(temp);

        const videosData = response.data.items.map((item: Video) => ({
          etag: item.etag,
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          snippet: item.snippet,
        }));

        setVideos(videosData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.error.message);
          // setError('Ошибка при загрузке видео');
        } else if (err instanceof Error) {
          console.log(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='grid gap-4  grid-cols-[repeat(auto-fill,minmax(340px,1fr))] '>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {videos.map((video) => {
        return (
          <div
            key={video.snippet.title}
            onMouseEnter={() => setHoveredVideoId(video.id.videoId)}
            onMouseLeave={() => setHoveredVideoId(null)}
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className={`w-full h-[240px] object-cover rounded-md transition ease-in hover:rounded-none`}
            />
            {/* {hoveredVideoId === video.id.videoId ? (
              <iframe
                className='w-full h-[250px] delay-200'
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1`}
                title={video.snippet.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className='w-full h-[240px] object-cover rounded-md transition ease-in hover:rounded-none'
              />
            )} */}
            <p>{video.snippet.title}</p>
          </div>
        );
      })}
    </div>
  );
};
