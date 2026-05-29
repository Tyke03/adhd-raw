import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RECOMMENDED_ORDER, songBySlug, type Song } from "@/data/songs";

const PLAYLIST: Song[] = RECOMMENDED_ORDER
  .map((slug) => songBySlug(slug))
  .filter((s): s is Song => Boolean(s && s.audio));

type Ctx = {
  playlist: Song[];
  currentIndex: number;
  current: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  selectIndex: (i: number) => void;
  selectSlug: (slug: string) => void;
  seek: (t: number) => void;
};

const PlayerCtx = createContext<Ctx | null>(null);

export function usePlayer() {
  const c = useContext(PlayerCtx);
  if (!c) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return c;
}

const LS_SLUG = "player:slug";
const LS_TIME = "player:time";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastIndexRef = useRef<number>(0);
  const restoredRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage (client only)
  useEffect(() => {
    try {
      const slug = localStorage.getItem(LS_SLUG);
      if (slug) {
        const i = PLAYLIST.findIndex((s) => s.slug === slug);
        if (i >= 0) {
          setCurrentIndex(i);
          lastIndexRef.current = i;
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist current slug
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_SLUG, PLAYLIST[currentIndex].slug);
    } catch {
      /* ignore */
    }
  }, [currentIndex, hydrated]);

  // Persist time periodically
  useEffect(() => {
    if (!hydrated) return;
    const id = window.setInterval(() => {
      try {
        localStorage.setItem(LS_TIME, String(audioRef.current?.currentTime ?? 0));
      } catch {
        /* ignore */
      }
    }, 2000);
    return () => window.clearInterval(id);
  }, [hydrated]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {
      /* autoplay may be blocked; ignore */
    });
  }, []);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) play();
    else pause();
  }, [play, pause]);
  const next = useCallback(
    () => setCurrentIndex((i) => (i + 1) % PLAYLIST.length),
    [],
  );
  const prev = useCallback(
    () =>
      setCurrentIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length),
    [],
  );
  const selectIndex = useCallback((i: number) => {
    setCurrentIndex(i);
  }, []);
  const selectSlug = useCallback((slug: string) => {
    const i = PLAYLIST.findIndex((s) => s.slug === slug);
    if (i >= 0) setCurrentIndex(i);
  }, []);
  const seek = useCallback((t: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  }, []);

  // When the track changes by user action, autoplay the new one.
  // On initial hydration of the same slug, restore the previous time instead.
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const a = e.currentTarget;
    setDuration(a.duration);
    if (!restoredRef.current) {
      restoredRef.current = true;
      try {
        const t = parseFloat(localStorage.getItem(LS_TIME) || "0");
        if (!isNaN(t) && t > 0 && t < a.duration - 1) {
          a.currentTime = t;
          setCurrentTime(t);
        }
      } catch {
        /* ignore */
      }
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    if (lastIndexRef.current !== currentIndex) {
      lastIndexRef.current = currentIndex;
      setCurrentTime(0);
      // Try to play the newly-selected track (user-initiated, so allowed).
      setTimeout(() => play(), 0);
    }
  }, [currentIndex, hydrated, play]);

  const current = PLAYLIST[currentIndex];

  return (
    <PlayerCtx.Provider
      value={{
        playlist: PLAYLIST,
        currentIndex,
        current,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        toggle,
        next,
        prev,
        selectIndex,
        selectSlug,
        seek,
      }}
    >
      {children}
      {hydrated && current.audio ? (
        <audio
          ref={audioRef}
          src={current.audio}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={next}
        />
      ) : null}
    </PlayerCtx.Provider>
  );
}

export { PLAYLIST };