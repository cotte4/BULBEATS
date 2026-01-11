import { useState, useCallback } from 'react';
import type { Beat } from '../types/beat';
import { searchBeats, filterBeatsByKey } from '../lib/youtube';

interface UseYouTubeSearchReturn {
  beats: Beat[];
  filteredBeats: Beat[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  setKeyFilter: (key: string) => void;
  selectedKey: string;
  searchQuery: string;
}

export function useYouTubeSearch(): UseYouTubeSearchReturn {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState('All Keys');
  const [searchQuery, setSearchQuery] = useState('');

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchBeats(query);
      setBeats(result.beats);
    } catch (err) {
      setError('No pudimos buscar, intenta de nuevo');
      setBeats([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setKeyFilter = useCallback((key: string) => {
    setSelectedKey(key);
  }, []);

  const filteredBeats = filterBeatsByKey(beats, selectedKey);

  return {
    beats,
    filteredBeats,
    isLoading,
    error,
    search,
    setKeyFilter,
    selectedKey,
    searchQuery,
  };
}
