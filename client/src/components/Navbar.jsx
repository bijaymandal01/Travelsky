import { NavLink } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="flex-center gap-1">

        <h2 className="h4">
          TravelSky
        </h2>

      </div>

      <div className="flex gap-2">

        <NavLink to="/" >Home</NavLink>
        <NavLink to="/results" >result</NavLink>

      </div>

    </nav>

  );
}

export default Navbar;