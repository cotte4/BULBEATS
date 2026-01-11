import type { Beat, YouTubeSearchResponse, SearchResult, BpmRange } from '../types/beat';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// Fisher-Yates shuffle for randomizing beats
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Parse BPM from title (e.g., "140 BPM", "140bpm", "bpm 140")
function parseBpm(title: string): number | undefined {
  const patterns = [
    /(\d{2,3})\s*bpm/i,      // "140 BPM" or "140bpm"
    /bpm\s*(\d{2,3})/i,      // "BPM 140"
    /(\d{2,3})\s*bpm/i,      // Just in case
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      const bpm = parseInt(match[1], 10);
      if (bpm >= 60 && bpm <= 200) {
        return bpm;
      }
    }
  }
  return undefined;
}

// Parse Type Beat from title (e.g., "Drake Type Beat", "Travis Scott Type")
function parseTypeBeat(title: string): string | undefined {
  // Common patterns for type beats
  const patterns = [
    /\[?\s*(\w+(?:\s+\w+)?)\s+type\s*(?:beat)?\s*\]?/i,  // "Drake Type Beat" or "[Drake Type]"
    /type\s+(\w+(?:\s+\w+)?)\s+beat/i,                    // "Type Drake Beat"
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) {
      const artist = match[1].trim();
      // Filter out generic words
      const genericWords = ['free', 'hard', 'dark', 'chill', 'sad', 'trap', 'drill', 'boom', 'bap', 'lofi', 'lo-fi'];
      if (!genericWords.includes(artist.toLowerCase()) && artist.length > 1) {
        return artist;
      }
    }
  }
  return undefined;
}

export async function searchBeats(query: string, pageToken?: string): Promise<SearchResult> {
  if (!query.trim()) return { beats: [] };

  const searchQuery = `${query} beat instrumental`;

  const params = new URLSearchParams({
    part: 'snippet',
    q: searchQuery,
    type: 'video',
    videoCategoryId: '10',
    maxResults: '50',
    key: API_KEY,
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Error al buscar beats');
  }

  const data: YouTubeSearchResponse = await response.json();

  const beats: Beat[] = data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    bpm: parseBpm(item.snippet.title),
    typeBeat: parseTypeBeat(item.snippet.title),
  }));

  return {
    beats: shuffle(beats),
    nextPageToken: data.nextPageToken,
  };
}

export function filterBeatsByKey(beats: Beat[], key: string): Beat[] {
  if (key === 'All Keys') return beats;

  return beats.filter((beat) => {
    const title = beat.title.toLowerCase();
    const keyLower = key.toLowerCase();

    const keyPattern = new RegExp(`\\b${keyLower.replace('#', '\\#')}\\b`, 'i');
    return keyPattern.test(title);
  });
}

export function filterBeatsByBpm(beats: Beat[], bpmRange: BpmRange): Beat[] {
  if (bpmRange.label === 'All BPM') return beats;

  return beats.filter((beat) => {
    if (!beat.bpm) return false;
    return beat.bpm >= bpmRange.min && beat.bpm <= bpmRange.max;
  });
}

export function filterBeatsByType(beats: Beat[], typeBeat: string): Beat[] {
  if (typeBeat === 'All Types') return beats;

  return beats.filter((beat) => {
    return beat.typeBeat?.toLowerCase() === typeBeat.toLowerCase();
  });
}

export function filterBeatsByChannel(beats: Beat[], channel: string): Beat[] {
  if (channel === 'All Channels') return beats;

  return beats.filter((beat) => beat.channelTitle === channel);
}

export function getUniqueChannels(beats: Beat[]): string[] {
  const channels = new Set(beats.map(b => b.channelTitle));
  return Array.from(channels).sort();
}
