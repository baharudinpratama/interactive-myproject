import { useState, useEffect, useCallback } from "react";

export const useCountdownTimer = (initialTime = 60, localStorageKey = "action-timer") => {
  // Safely check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  };

  // Safely get item from localStorage
  const safeGetItem = (key: string): string | null => {
    try {
      return isLocalStorageAvailable() ? localStorage.getItem(key) : null;
    } catch (e) {
      return null;
    }
  };

  // Safely set item in localStorage
  const safeSetItem = (key: string, value: string) => {
    try {
      if (isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      // Silently fail
    }
  };

  // Safely remove item from localStorage
  const safeRemoveItem = (key: string) => {
    try {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // Silently fail
    }
  };

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    // Initialize from localStorage or use initial time
    const savedTime = safeGetItem(localStorageKey);
    const savedTimestamp = safeGetItem(`${localStorageKey}-timestamp`);

    if (savedTime && savedTimestamp) {
      try {
        const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
        const remainingTime = Math.max(parseInt(savedTime) - elapsedTime, 0);
        return remainingTime;
      } catch (e) {
        return 0;
      }
    }

    return 0;
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const startTimer = useCallback(() => {
    const newTimeLeft = initialTime;
    setTimeLeft(newTimeLeft);
    safeSetItem(localStorageKey, newTimeLeft.toString());
    safeSetItem(`${localStorageKey}-timestamp`, Date.now().toString());
  }, [initialTime, localStorageKey]);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    safeRemoveItem(localStorageKey);
    safeRemoveItem(`${localStorageKey}-timestamp`);
  }, [localStorageKey]);

  // Effect to manage timer countdown and localStorage
  useEffect(() => {
    // Only start timer if time is remaining
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;

          // Update localStorage
          if (newTime > 0) {
            safeSetItem(localStorageKey, newTime.toString());
            safeSetItem(`${localStorageKey}-timestamp`, Date.now().toString());
          } else {
            // Clear localStorage when timer reaches zero
            safeRemoveItem(localStorageKey);
            safeRemoveItem(`${localStorageKey}-timestamp`);
          }

          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, localStorageKey]);

  const getTimerString = useCallback(() => {
    return timeLeft > 0 ? formatTime(timeLeft) : "00:00";
  }, [timeLeft, formatTime]);

  const canTriggerAction = useCallback(() => {
    return timeLeft === 0 && !isProcessing;
  }, [timeLeft, isProcessing]);

  const handleAction = useCallback(async (actionFunction: () => Promise<void>) => {
    if (canTriggerAction()) {
      try {
        setIsProcessing(true);
        await actionFunction();
        // Start timer and set in localStorage
        startTimer();
      } catch (error) {
        console.error("Action failed", error);
      } finally {
        setIsProcessing(false);
      }
    }
  }, [canTriggerAction, startTimer]);

  return {
    timeLeft,
    isProcessing,
    startTimer,
    resetTimer,
    getTimerString,
    canTriggerAction,
    handleAction
  };
};
