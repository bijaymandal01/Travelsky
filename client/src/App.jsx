import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Results from "./components/Results";
import Navbar from "./components/Navbar";
import NotFoundPage from "./Pages/NotFoundPage";
import FeatureSection from "./layouts/FeatureSection";
import HowItWorks from "./layouts/HowItWorks";

function App() {

  return (<>
    <Navbar/>

        <Routes  >
          <Route path='/' element={<Home/>} />
          <Route path="/results" element={<Results/>}/>
          <Route path="/features" element={<FeatureSection/>}/>
          <Route path="/how-it-works" element={<HowItWorks/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
  </>

  );
}

export default App;