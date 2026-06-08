import SearchPanel from "./SearchPanel";

function Hero() {
  return (
    <section className=" from-sky-50 to-white py-12 lg:py-20">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 mb-5">
              Smart Travel Weather Planning
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Route Weather Intelligence
              <span className="block text-blue-600">
                For Better Planning on Travel
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Get weather forecasts, rain alerts,
              visibility warnings and travel insights
              across your entire route before departure.
            </p>


          </div>

          {/* Right Side */}
          <div>
            <SearchPanel />
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;