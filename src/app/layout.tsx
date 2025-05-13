import type {Metadata} from 'next';
import { Geist_Mono } from 'next/font/google'; // Changed from Geist to Geist_Mono
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const geistMono = Geist_Mono({ // Changed from geistSans to geistMono
  variable: '--font-geist-mono', // Changed variable name
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pixel Planner', // Updated title
  description: 'Plan your day with pixelated perfection!', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased bg-background text-foreground`}> {/* Use geistMono */}
        {children}
        <Toaster /> {/* Added Toaster */}
      </body>
    </html>
  );
}
