import Navbar from '@components/layout/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-background to-primary from-70% min-h-screen">
        <div className="flex content-center justify-center">{children}</div>
      </main>
    </>
  );
}
