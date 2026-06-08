import React from 'react'

export default function SampleRoutePreview() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            See TravelSky In Action
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Here's an example of how TravelSky helps travelers
            understand weather conditions across an entire route.
          </p>

        </div>

        <div className="bg-white border border-black rounded-3xl shadow-sm p-6 lg:p-8">

          {/* Route */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

            <div>
              <p className="text-sm text-slate-500">
                Example Journey
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                Delhi → Jaipur
              </h3>

              <p className="text-slate-500 mt-1">
                281 km • 5 hrs 20 mins
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
                Travel Score: 84
              </div>

              <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl">
                Good Conditions
              </div>

            </div>

          </div>

          {/* Alerts */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">
                🌧
              </div>

              <h4 className="font-semibold">
                Rain Alert
              </h4>

              <p className="text-sm text-slate-600 mt-1">
                Light rain expected near Gurgaon around 2 PM.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">
                🌡️
              </div>

              <h4 className="font-semibold">
                Heat Advisory
              </h4>

              <p className="text-sm text-slate-600 mt-1">
                Temperatures may reach 41°C near Rewari.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">
                👁️
              </div>

              <h4 className="font-semibold">
                Visibility
              </h4>

              <p className="text-sm text-slate-600 mt-1">
                Visibility remains good throughout the route.
              </p>
            </div>

          </div>

          {/* Timeline Preview */}
          <div>

            <h4 className="font-semibold text-slate-800 mb-4">
              Route Timeline Preview
            </h4>

            <div className="grid md:grid-cols-4 gap-4">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium">
                  Delhi
                </p>
                <p className="text-sm text-slate-500">
                  Clear • 34°C
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium">
                  Gurgaon
                </p>
                <p className="text-sm text-slate-500">
                  Rain • 30°C
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium">
                  Rewari
                </p>
                <p className="text-sm text-slate-500">
                  Hot • 41°C
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium">
                  Jaipur
                </p>
                <p className="text-sm text-slate-500">
                  Clear • 35°C
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}