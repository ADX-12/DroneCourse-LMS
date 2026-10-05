import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Drone Academy India – Professional Drone Technology Training',
    template: '%s | Drone Academy India',
  },
  description: 'India\'s premier drone technology training platform. Learn drone systems, UAV engineering, autonomous flight, and more through structured online courses with LMS access.',
  keywords: ['drone training', 'UAV course', 'drone technology', 'DGCA', 'drone engineering', 'India', 'online course'],
  authors: [{ name: 'Drone Academy India' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
