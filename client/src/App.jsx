import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Results from "./components/Results";
import Navbar from "./components/Navbar";

function App() {

  return (<>
    <Navbar/>

        <Routes  >
          <Route path='/' element={<Home/>} />
          <Route path="/results" element={<Results/>}/>
        </Routes>
  </>

  );
}

export default App;