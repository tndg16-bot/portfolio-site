import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center overflow-x-hidden pt-20 text-japan-charcoal">
      <Header />
      <HomeContent />
      <Footer />
    </main>
  );
}
