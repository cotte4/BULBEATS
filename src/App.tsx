import { useState } from 'react';
import { Header } from './components/Header';
import { GenreSelect } from './components/GenreSelect';
import { SwipeView } from './components/SwipeView';
import { FavoritesList } from './components/FavoritesList';
import { RankingsView } from './components/RankingsView';
import { UsernameModal } from './components/UsernameModal';
import { useSwipeStore } from './stores/useSwipeStore';
import { useFavoritesStore } from './stores/useFavoritesStore';
import { useUserStore } from './stores/useUserStore';

type View = 'genres' | 'swipe' | 'favorites' | 'rankings';

function App() {
  const [view, setView] = useState<View>('genres');
  const { setGenre, genre, reset } = useSwipeStore();
  const { favorites } = useFavoritesStore();
  const username = useUserStore((s) => s.username);

  const handleSelectGenre = async (searchTerm: string) => {
    await setGenre(searchTerm);
    setView('swipe');
  };

  const handleBack = () => {
    if (view === 'favorites' || view === 'rankings') {
      setView(genre ? 'swipe' : 'genres');
    } else {
      reset();
      setView('genres');
    }
  };

  const handleFavorites = () => {
    setView('favorites');
  };

  const handleRankings = () => {
    setView('rankings');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!username && <UsernameModal />}

      {view !== 'genres' && (
        <Header
          view={view}
          onBack={handleBack}
          onFavorites={handleFavorites}
          onRankings={handleRankings}
          favoritesCount={favorites.length}
          genre={genre || undefined}
        />
      )}

      {view === 'genres' && (
        <GenreSelect
          onSelectGenre={handleSelectGenre}
          onRankings={handleRankings}
          onFavorites={handleFavorites}
          favoritesCount={favorites.length}
        />
      )}

      {view === 'swipe' && <SwipeView />}

      {view === 'favorites' && <FavoritesList />}

      {view === 'rankings' && <RankingsView />}
    </div>
  );
}

export default App;
