import { ReactNode } from 'react';
import './globals.css';
import { GeneralDataProvider } from '@/context/GeneralDataContext';

export const metadata = {
  title: "Payflex | Payflex Banking App",
  description: "Payflex is a modern Banking platform for everyone.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='relative h-full min-h-fit flex'>
        <div className="w-full h-fit min-h-screen">
          <GeneralDataProvider>
            {children}
          </GeneralDataProvider>
        </div>
      </body>
    </html>
  );
}
