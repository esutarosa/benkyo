import { useEffect, useSyncExternalStore } from 'react';

const didMountStore = {
  value: false as boolean,
  listeners: new Set<() => void>(),
  // Call this once (on first mount) to flip the flag and notify everyone
  setMounted() {
    if (!this.value) {
      this.value = true;
      for (const listener of this.listeners) {
        listener();
      }
    }
  },
  // subscribe/unsubscribe for useSyncExternalStore
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  // pull the current snapshot
  getSnapshot() {
    return this.value;
  },
};

// During rendering, it calls useSyncExternalStore(...) to subscribe to didMountStore
// On first-mount of any component that uses this hook, we’ll flip didMountStore.value to true
// inside a useEffect. That will trigger all subscribers to re-render exactly once
export function useDidMount(): boolean {
  const isMounted = useSyncExternalStore(
    onStoreChange => {
      return didMountStore.subscribe(onStoreChange);
    },
    () => didMountStore.getSnapshot(),
    () => false
  );

  // Only in the browser, after the first render, mark the store as “mounted”
  // This effect runs once (per app), so any consuming component sees that change and re-renders
  useEffect(() => {
    didMountStore.setMounted();
  }, []);

  return isMounted;
}
