import React, { useState, useEffect, useRef, useCallback } from 'react';

export type IntroState = 'intro' | 'transition' | 'complete';

interface CinematicIntroProps {
  onIntroEnd: () => void;
  fadeToBlack?: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onIntroEnd,
  fadeToBlack = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  const [introState, setIntroState] = useState<IntroState>('intro');
  const hasTriggeredEndRef = useRef(false);

  // Responsive device check for video source
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth < 768 || mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', updateDeviceType);
    window.addEventListener('resize', updateDeviceType);
    return () => {
      mediaQuery.removeEventListener('change', updateDeviceType);
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  const videoSource = isMobile ? '/vdo/mobile.mp4' : '/vdo/desk.mp4';

  // Trigger UI reveal after exactly 4 seconds
  // Video continues playing normally, seamlessly looping without any pause or darkening
  const handleIntroComplete = useCallback(() => {
    if (hasTriggeredEndRef.current) return;
    hasTriggeredEndRef.current = true;

    setIntroState('complete');
    onIntroEnd();
  }, [onIntroEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    // 4-second delay before foreground UI reveal begins
    const timer = setTimeout(() => {
      handleIntroComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleIntroComplete, videoSource]);

  return (
    <div
      id="scalex-cinematic-stage"
      aria-label="ScaleX Cinematic Video Experience"
      className="fixed inset-0 w-full h-full select-none overflow-hidden bg-black pointer-events-none z-0"
    >
      {/* 
        Single continuous video element:
        - Starts playing immediately
        - Loops smoothly and infinitely
        - Stays playing in background with crisp clarity
      */}
      <video
        ref={videoRef}
        key={`video-${videoSource}`}
        src={videoSource}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        onError={() => {
          console.error(`ScaleX video failed to load: ${videoSource}`);
        }}
      />

      {/* 
        Cinematic dark overlay:
        - Exactly 0% opacity during intro and element reveals (100% video visibility)
        - After all elements settle and 1-second pause has passed, smoothly fades in over 2000ms
        - Stops at 50% opacity so car and scene details remain clearly visible
      */}
      <div
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-[2000ms] ease-out ${
          fadeToBlack ? 'opacity-50' : 'opacity-0'
        }`}
      />
    </div>
  );
};
