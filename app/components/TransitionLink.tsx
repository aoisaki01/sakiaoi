
'use client';

import Link, { LinkProps } from 'next/link';

import React from 'react';
import { useTransitionRouter } from './PageTransitionProvider'; // Sesuaikan path jika perlu

interface TransitionLinkProps extends LinkProps {
 
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const { startTransition } = useTransitionRouter();

  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href.toString());
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}