import React, { useState, useEffect, useRef, useCallback } from 'react';

export type IntroState = 'intro' | 'transition' | 'complete';

interface CinematicIntroProps {
  onIntroEnd: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onIntroEnd }) => {
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  // Explicit state machine: 'intro' -> 'transition' -> 'complete'
  // Once state reaches 'transition' / 'complete', it NEVER returns to 'intro'
  const [introState, setIntroState] = useState<IntroState>('intro');
  const hasTriggeredEndRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  // Responsive device orientation / width check
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

  // State Transition handler when Intro finishes:
  // 1. Mark intro finished permanently
  // 2. Pause the intro video (never play it again, never loop, never reset currentTime)
  // 3. Move state from 'intro' to 'transition'
  // 4. Start playing the second BACKGROUND VIDEO (with loop=true)
  // 5. Notify parent (App.tsx)
  // 6. After transition window (1000ms), finalize state to 'complete'
  const handleIntroComplete = useCallback(() => {
    if (hasTriggeredEndRef.current) return;
    hasTriggeredEndRef.current = true;

    // 1. Pause and permanently stop the intro video element
    const introVideo = introVideoRef.current;
    if (introVideo) {
      try {
        introVideo.pause();
      } catch {
        // ignore
      }
    }

    // 2. Move to transition state
    setIntroState('transition');

    // 3. Start the distinct background video element seamlessly
    const bgVideo = backgroundVideoRef.current;
    if (bgVideo) {
      try {
        bgVideo.currentTime = 0;
        bgVideo.playbackRate = 1.0;
        const p = bgVideo.play();
        if (p !== undefined) {
          p.catch(() => {
            bgVideo.muted = true;
            bgVideo.play().catch(() => {});
          });
        }
      } catch {
        // ignore
      }
    }

    // 4. Notify App to reveal floating UI elements
    onIntroEnd();

    // 5. Finalize transition to 'complete' after 1.0s fade window
    setTimeout(() => {
      setIntroState('complete');
    }, 1000);
  }, [onIntroEnd]);

  // Smooth playback acceleration on user scroll/wheel during intro only
  const acceleratePlayback = useCallback(() => {
    if (hasTriggeredEndRef.current || introState !== 'intro') return;
    const introVideo = introVideoRef.current;
    if (!introVideo) return;

    if (introVideo.playbackRate < 4.0) {
      introVideo.playbackRate = 4.0;
    }
  }, [introState]);

  // Setup Intro Video on mount - reveals overlay after exactly 4 seconds
  useEffect(() => {
    const introVideo = introVideoRef.current;
    if (!introVideo) return;

    introVideo.currentTime = 0;
    introVideo.playbackRate = 1.0;
    hasTriggeredEndRef.current = false;

    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        introVideo.muted = true;
        introVideo.play().catch(() => {});
      });
    }

    // Reveal overlay at exactly 4 seconds
    const timer = setTimeout(() => {
      handleIntroComplete();
    }, 4000);

    const handleEnded = () => {
      handleIntroComplete();
    };

    const handleTimeUpdate = () => {
      if (!hasTriggeredEndRef.current && introVideo.currentTime >= 4.0) {
        handleIntroComplete();
      }
    };

    introVideo.addEventListener('ended', handleEnded);
    introVideo.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      clearTimeout(timer);
      introVideo.removeEventListener('ended', handleEnded);
      introVideo.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [handleIntroComplete, videoSource]);

  // Intercept user scroll/wheel/touch to accelerate intro video toward end
  // Disabled as soon as introState is no longer 'intro'
  useEffect(() => {
    if (introState !== 'intro') return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 2) {
        acceleratePlayback();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = Math.abs(touchStartYRef.current - currentY);
      if (diff > 8) {
        acceleratePlayback();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp', 'End'].includes(e.code)) {
        acceleratePlayback();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [introState, acceleratePlayback]);

  const isIntroActive = introState === 'intro';
  const isPostIntro = introState === 'transition' || introState === 'complete';

  return (
    <div
      id="scalex-cinematic-stage"
      aria-label="ScaleX Cinematic Video Experience"
      className="fixed inset-0 w-screen h-screen select-none overflow-hidden bg-[#08090b]"
      style={{
        zIndex: isIntroActive ? 50 : 0,
        pointerEvents: isIntroActive ? 'auto' : 'none',
        touchAction: isIntroActive ? 'none' : 'auto',
      }}
    >
      {/* 
        =======================================================================
        VIDEO ELEMENT 1: INTRO VIDEO (Dedicated strictly to single-play intro)
        =======================================================================
        - Plays from 0 -> 4.0s ONLY ONCE.
        - NO loop!
        - Never resets currentTime back to 0.
        - Never restarts once ended.
        - Fades out cleanly (opacity: 1 -> 0) during transition.
        - Completely disabled / hidden when complete.
      */}
      {introState !== 'complete' && (
        <video
          ref={introVideoRef}
          key={`intro-${videoSource}`}
          src={videoSource}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none transition-opacity duration-1000 ease-out"
          style={{
            opacity: isIntroActive ? 1 : 0,
          }}
          onError={() => {
            console.error(`ScaleX intro video failed: ${videoSource}`);
          }}
        />
      )}

      {/* 
        =======================================================================
        VIDEO ELEMENT 2: BACKGROUND VIDEO (Dedicated to permanent hero ambient)
        =======================================================================
        - Completely invisible (opacity: 0) during initial intro.
        - Revealed (opacity: 0 -> 1) when intro completes.
        - Has loop=true, continuously plays behind the UI.
        - Non-interactive, stays in background (z-0).
        - Can never take over the screen or restart intro state.
      */}
      <video
        ref={backgroundVideoRef}
        key={`bg-${videoSource}`}
        src={videoSource}
        muted
        playsInline
        loop
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover block pointer-events-none transition-opacity duration-1000 ease-out"
        style={{
          opacity: isPostIntro ? 1 : 0,
        }}
        onError={() => {
          console.error(`ScaleX background video failed: ${videoSource}`);
        }}
      />

      {/* 
        =======================================================================
        DARK CINEMATIC OVERLAY (Applied ONLY after intro finishes)
        =======================================================================
        - Opacity 0 during intro (clean full-screen video).
        - Opacity fades to ~0.60 (55%–65% dark overlay) during transition.
        - Keeps car and environment clearly visible, cinematic, and recognizable
        - Provides contrast for floating logo, profile/cart icons, headline & button.
      */}
      <div
        className="absolute inset-0 bg-[#08090b] pointer-events-none transition-opacity duration-1000 ease-out"
        style={{
          opacity: isPostIntro ? 0.6 : 0,
        }}
      />
    </div>
  );
};
