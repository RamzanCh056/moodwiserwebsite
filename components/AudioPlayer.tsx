'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  description?: string;
  day: number;
  englishSrc: string;
  spanishSrc: string;
  language?: 'english' | 'spanish';
  onLanguageChange?: () => void;
}

export default function AudioPlayer({ src, title, description, day, englishSrc, spanishSrc, language = 'english', onLanguageChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Update audio source when src changes (language switch)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Get current source path (extract from full URL)
    const currentFullSrc = audio.src;
    const currentPath = currentFullSrc ? new URL(currentFullSrc).pathname : '';
    const newPath = src;
    
    // Only reload if source path actually changed
    if (currentPath !== newPath) {
      const wasPlaying = isPlaying;
      
      if (wasPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
      
      // Set new source
      audio.src = src;
      setCurrentTime(0);
      setIsLoading(true);
      
      // Load the new audio
      audio.load();
      
      // If it was playing, wait for load then play
      if (wasPlaying) {
        const playWhenReady = () => {
          setIsLoading(false);
          audio.play().catch(() => {
            setIsPlaying(false);
          });
        };
        audio.addEventListener('canplay', playWhenReady, { once: true });
      } else {
        // Just wait for metadata to load
        const loadMetadata = () => {
          setIsLoading(false);
        };
        audio.addEventListener('loadedmetadata', loadMetadata, { once: true });
      }
    }
  }, [src]);

  // Set initial source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audio.src) return;
    audio.src = src;
    audio.load();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative rounded-[32px] bg-gradient-to-br from-sky-100/70 via-white to-purple-100/70 p-[1px] shadow-[0_18px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_22px_55px_rgba(15,23,42,0.16)] transition-shadow duration-300 group">
      <div className="bg-white/95 rounded-[30px] p-8 border border-white/80 relative overflow-hidden backdrop-blur-xl">
        {/* Decorative gradient backgrounds */}
        <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-100/40 to-indigo-100/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <audio ref={audioRef} preload="metadata" />
        
        {/* Header */}
        <div className="mb-6 relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_14px_35px_rgba(56,189,248,0.5)] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              {day}
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 mb-2 rounded-full bg-sky-50/80 border border-sky-100 px-3 py-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {language === 'english' ? `Day ${day} • Guided Session` : `Día ${day} • Sesión Guiada`}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300">
                {title}
              </h3>
              {description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Audio Player Controls */}
        <div className="space-y-5 relative z-10">
          {/* Progress Bar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner"></div>
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-sky-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="relative w-full h-4 bg-transparent appearance-none cursor-pointer z-10"
              style={{
                background: 'transparent',
              }}
            />
          </div>

          {/* Time Display and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              {/* Download Audio Icon */}
              <a
                href={src}
                download
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-100 to-indigo-100 hover:from-sky-200 hover:to-indigo-200 text-sky-600 hover:text-sky-700 transition-all transform hover:scale-110 hover:rotate-6 cursor-pointer border border-sky-200/50 shadow-sm hover:shadow-md group/download"
                aria-label="Download audio"
                title="Download audio"
              >
                <svg className="w-4 h-4 group-hover/download:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Skip Backward */}
              <button
                onClick={skipBackward}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-md hover:shadow-lg border border-gray-200/50 group"
                aria-label="Skip backward 10 seconds"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-sky-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 hover:from-sky-600 hover:via-indigo-600 hover:to-purple-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ring-4 ring-sky-100/50 hover:ring-sky-200/50 relative overflow-hidden group/play"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/play:translate-x-full transition-transform duration-1000"></div>
                {isLoading ? (
                  <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                ) : isPlaying ? (
                  <svg className="w-9 h-9 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-9 h-9 text-white ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip Forward */}
              <button
                onClick={skipForward}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-md hover:shadow-lg border border-gray-200/50 group"
                aria-label="Skip forward 10 seconds"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-sky-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

