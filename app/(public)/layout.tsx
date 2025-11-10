import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />

      </body>
    </html>

  );
}
