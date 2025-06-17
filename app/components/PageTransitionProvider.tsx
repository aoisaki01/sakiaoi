'use client';


import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';


interface TransitionContextType {
  startTransition: (href: string) => void;
}


const TransitionContext = React.createContext<TransitionContextType>({
  startTransition: () => {},
});

// Hook kustom untuk memudahkan penggunaan context di komponen lain
export const useTransitionRouter = () => React.useContext(TransitionContext);

// Komponen Provider utama
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const targetHref = React.useRef<string>('');

  // Tandai bahwa load pertama telah selesai
  React.useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  
  const startTransition = (href: string) => {
    
    if (href === pathname) return;
    
    targetHref.current = href;
    setIsTransitioning(true); 
  };


  React.useEffect(() => {
    if (isTransitioning) {
     
      const timer = setTimeout(() => {
        router.push(targetHref.current);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, router]);


  React.useEffect(() => {

    if (!isFirstLoad) {
      setIsTransitioning(false);
    }
  }, [pathname, isFirstLoad]);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
     
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center bg-stone-50
          transition-transform duration-500 ease-in-out
          ${isTransitioning ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
       
        <Image 
          src="/saki.gif" 
          alt="Loading"
          width={150}
          height={150}
          unoptimized={true} 
        />
      </div>
    </TransitionContext.Provider>
  );
}