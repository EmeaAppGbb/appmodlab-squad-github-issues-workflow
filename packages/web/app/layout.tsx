import './globals.css';
import { TRPCProvider } from '../components/TRPCProvider';

export const metadata = {
  title: 'DevConnect - Developer Q&A',
  description: 'Developer community forum and knowledge base',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
