import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function PageLayout({ children, hideFooter = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
}
