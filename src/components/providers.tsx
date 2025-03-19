'use client';

import NextTopLoader from 'nextjs-toploader';
import { Toaster } from './ui/toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NextTopLoader />
            {children}
            <Toaster />
        </>
    );
}
