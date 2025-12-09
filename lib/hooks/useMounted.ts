import { useState, useEffect } from 'react';

/**
 * Hook to check if component is mounted (client-side only)
 * Useful for preventing hydration mismatches in SSR
 * @returns boolean indicating if component is mounted
 * @example
 * const mounted = useMounted();
 * if (!mounted) return null;
 */
export function useMounted(): boolean {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}
