import Navbar from "@/components/site/navbar";
import Hero from "@/components/sections/hero";
import Ticker from "@/components/sections/ticker";
import Positioning from "@/components/sections/positioning";
import Roster from "@/components/sections/roster";
import Method from "@/components/sections/method";
import Proof from "@/components/sections/proof";
import Contact from "@/components/sections/contact";
import Closing from "@/components/sections/closing";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="[contain:layout_style]">
        <Hero />
        <Ticker />
        <Positioning />
        <Roster />
        <Method />
        <Proof />
        <Contact />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
