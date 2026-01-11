export interface Genre {
  id: string;
  label: string;
  emoji: string;
  searchTerm: string;
}

export const GENRES: Genre[] = [
  { id: 'trap', label: 'Trap', emoji: '🔥', searchTerm: 'trap' },
  { id: 'boombap', label: 'Boom Bap', emoji: '🎤', searchTerm: 'boom bap' },
  { id: 'lofi', label: 'Lo-Fi', emoji: '🌙', searchTerm: 'lofi chill' },
  { id: 'drill', label: 'Drill', emoji: '🔫', searchTerm: 'drill' },
  { id: 'rnb', label: 'R&B', emoji: '💜', searchTerm: 'rnb soul' },
  { id: 'freestyle', label: 'Freestyle', emoji: '🎯', searchTerm: 'freestyle' },
  { id: 'oldschool', label: 'Old School', emoji: '📻', searchTerm: 'old school hip hop' },
  { id: 'latin', label: 'Latin', emoji: '🌴', searchTerm: 'latin trap reggaeton' },
];
