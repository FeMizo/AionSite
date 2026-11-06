'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
export function PublicAnalytics({children}:{children:ReactNode}){const pathname=usePathname();return pathname&&!/^\/admin(?:\/|$)/.test(pathname)?children:null;}
