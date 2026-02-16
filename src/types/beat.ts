export interface Beat {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  savedAt?: Date;
  bpm?: number;
  typeBeat?: string;
}

export interface YouTubeSearchResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchResult[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
  };
}

export interface SearchResult {
  beats: Beat[];
  nextPageToken?: string;
}

export const MUSICAL_KEYS = [
  'All Keys',
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'
] as const;

export type MusicalKey = typeof MUSICAL_KEYS[number];

export const BPM_RANGES = [
  { label: 'All BPM', min: 0, max: 999 },
  { label: 'Slow (60-90)', min: 60, max: 90 },
  { label: 'Mid (90-120)', min: 90, max: 120 },
  { label: 'Fast (120-150)', min: 120, max: 150 },
  { label: 'Very Fast (150+)', min: 150, max: 999 },
] as const;

export type BpmRange = typeof BPM_RANGES[number];

export interface RankedBeat {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  bpm?: number;
  typeBeat?: string;
  likes: number;
  dislikes: number;
  netVotes: number;
}
