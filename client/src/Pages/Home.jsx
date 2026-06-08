import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureSection from "../layouts/FeatureSection";
import HowItWorks from "../layouts/HowItWorks";
import SampleRoutePreview from "../layouts/SampleRoutePreview";
import Footer from "../layouts/Footer";

function Home() {

  return (

    <div>


      <Hero />
      <FeatureSection/>
      <HowItWorks/>
      <SampleRoutePreview/>
      <Footer/>

    </div>

  );
}

export default Home;