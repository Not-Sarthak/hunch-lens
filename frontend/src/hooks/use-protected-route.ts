import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

const PUBLIC_PATHS = ['/'];

export function useProtectedRoute() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isConnected && !PUBLIC_PATHS.includes(pathname)) {
      router.replace('/');
    }
  }, [isConnected, pathname, router]);

  return { isConnected };
}