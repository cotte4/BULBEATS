import { useState } from 'react';
import { Flame, Skull } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { ensureUser } from '../lib/firestore';

export function UsernameModal() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const valid = input.trim().length >= 2 && input.trim().length <= 20;

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);
    setError('');
    try {
      const ok = await ensureUser(slug, input.trim());
      if (!ok) {
        setError('Ese nombre ya esta tomado!');
        setLoading(false);
        return;
      }
      setUser(input.trim());
    } catch {
      setError('Error de conexion. Intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-4 p-8 bg-surface border-2 border-blood/50 relative">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blood via-hot-pink to-neon" />

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-8 h-8 text-blood flame-effect" />
            <h1 className="diablo-logo text-3xl">BULBEATS</h1>
            <Flame className="w-8 h-8 text-blood flame-effect" />
          </div>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            Elige tu nombre de guerra
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tu apodo..."
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 bg-background border-2 border-blood/30 text-white
                       text-lg uppercase tracking-wider placeholder:text-gray-600
                       focus:outline-none focus:border-blood transition-colors"
            style={{ clipPath: 'polygon(3% 0, 100% 0, 97% 100%, 0 100%)' }}
          />
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-gray-600">
              {input.trim().length}/20
            </span>
            {input.trim().length > 0 && input.trim().length < 2 && (
              <span className="text-xs text-blood">Min 2 caracteres</span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mb-4 text-blood text-sm">
            <Skull className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!valid || loading}
          className="trashy-btn w-full flex items-center justify-center gap-3 px-6 py-4
                     text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
            ) : (
              <Flame className="w-5 h-5" />
            )}
            {loading ? 'Entrando...' : 'Entrar'}
          </span>
        </button>
      </div>
    </div>
  );
}
