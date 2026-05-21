import { useEffect, useState } from 'react';

export default function useAutoSave(value, delay = 900) {
  const [isSaved, setIsSaved] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState(new Date());

  useEffect(() => {
    setIsSaved(false);
    const timer = window.setTimeout(() => {
      setIsSaved(true);
      setLastSavedAt(new Date());
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return {
    isSaved,
    lastSavedAt,
    statusLabel: isSaved ? 'Saved ✓' : 'Saving... ',
  };
}
