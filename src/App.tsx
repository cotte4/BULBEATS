import { useState } from 'react';
import { Header } from './components/Header';
import { GenreSelect } from './components/GenreSelect';
import { SwipeView } from './components/SwipeView';
import { FavoritesList } from './components/FavoritesList';
import { useSwipeStore } from './stores/useSwipeStore';
import { useFavoritesStore } from './stores/useFavoritesStore';

type View = 'genres' | 'swipe' | 'favorites';

function App() {
  const [view, setView] = useState<View>('genres');
  const { setGenre, genre, reset } = useSwipeStore();
  const { favorites } = useFavoritesStore();

  const handleSelectGenre = async (searchTerm: string) => {
    await setGenre(searchTerm);
    setView('swipe');
  };

  const handleBack = () => {
    if (view === 'favorites') {
      setView(genre ? 'swipe' : 'genres');
    } else {
      reset();
      setView('genres');
    }
  };

  const handleFavorites = () => {
    setView('favorites');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {view !== 'genres' && (
        <Header
          view={view}
          onBack={handleBack}
          onFavorites={handleFavorites}
          favoritesCount={favorites.length}
          genre={genre || undefined}
        />
      )}

      {view === 'genres' && (
        <GenreSelect onSelectGenre={handleSelectGenre} />
      )}

      {view === 'swipe' && <SwipeView />}

      {view === 'favorites' && <FavoritesList />}
    </div>
  );
}

export default App;
