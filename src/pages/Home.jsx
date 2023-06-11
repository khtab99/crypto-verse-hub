import Footer from "../components/Footer";
import Join from "../components/Join";
// import MarketUpdate from "../components/MarketUpdate";
import WhyUs from "../components/WhyUs";
import { HeroController } from "../controllers/HeroController";
import MarketUpdateController from "../controllers/MarketController";

function Home() {
  return (
    <>
      <HeroController />
      <MarketUpdateController />
      <WhyUs />
      <Join />
      <Footer />
    </>
  );
}

export default Home;
