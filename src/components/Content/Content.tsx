import { useState } from 'react';
import { useGetVideosQuery } from '../../api/api';

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
  id: string;
  snippet: Snippet;
}
// const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const Content = () => {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const { data, error, isLoading } = useGetVideosQuery();
  console.log('🚀 ~ Content ~ data:', data);

  return (
    <div className='grid gap-4  grid-cols-[repeat(auto-fill,minmax(340px,1fr))] '>
      {isLoading && <p>Loading...</p>}

      {error && <p>{error}</p>}
      {/* todo: error hangling rtk query ts */}
      {data &&
        data.items.map((video) => {
          return (
            <div
              key={video.snippet.title}
              onMouseEnter={() => setHoveredVideoId(video.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className={`w-full h-[240px] object-cover rounded-md transition ease-in hover:rounded-none`}
              />
              {/* {hoveredVideoId === video.id ? (
                <iframe
                  className='w-full h-[250px] delay-200'
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`}
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
