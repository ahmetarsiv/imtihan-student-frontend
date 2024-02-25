'use client';

import '@/app/style/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Progress } from '@/components/progress/Progress';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="tr">
            <body className={inter.className}>
                <ThemeProvider enableSystem={true} attribute="class">
                    <ReduxProvider store={store}>
                        <Progress />
                        {children}
                    </ReduxProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
