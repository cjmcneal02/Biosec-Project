import type { Metadata } from 'next';
import './globals.css';
import { ThreatProvider } from '@/state/ThreatContext';
import { ThemeProvider } from '@/state/ThemeContext';

export const metadata: Metadata = {
  title: 'BioSec Threat Intelligence Dashboard',
  description: 'Biotech and Cybersecurity Threat Intelligence Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ThreatProvider>
            {children}
          </ThreatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
