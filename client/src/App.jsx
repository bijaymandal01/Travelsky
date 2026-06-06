import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Results from "./components/Results";

function App() {

  return (
      <BrowserRouter>
        <Routes  >
          <Route path='/' element={<Home/>} />
          <Route path='/results' element={<Results/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;