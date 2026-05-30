import SearchPanel from "./SearchPanel";

function Hero() {

  return (

    <section className="section">

      <div className="container">

        <div className="grid grid-2 gap-3">

          <div>

            <h1 className="h1 mb-2">
              Smart Route Weather Forecast
            </h1>

            <p className="p mb-1">

              weather updates
              across your entire journey.

            </p>

          </div>

          <SearchPanel />

        </div>

      </div>

    </section>
  );
}

export default Hero;