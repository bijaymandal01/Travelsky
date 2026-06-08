import React from "react";

const JourneyTimeline = ({ routeSummary }) => {
  if (!routeSummary?.checkpoints) return null;

  const getWeatherIcon = (condition = "") => {
    const weather = condition.toLowerCase();

    if (weather.includes("rain")) return "rainy";
    if (weather.includes("cloud")) return "cloud";
    if (weather.includes("sun")) return "wb_sunny";

    return "partly_cloudy_day";
  };

  return (
    <div className="bg-white rounded-2xl border border-black shadow-sm p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-lg font-bold text-slate-800">
          Journey Timeline
        </h2>

        <button className="px-4 py-2 text-sm border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50">
          View on Map
        </button>

      </div>

      <div className="space-y-6">

        {routeSummary.checkpoints.map((checkpoint, index) => (

          <div
            key={index}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >

            {/* Left Timeline */}
            <div className="flex gap-4 min-w-[240px]">

              <div className="flex flex-col items-center">

                <div
                  className={`h-4 w-4 rounded-full ${
                    index === 0
                      ? "bg-green-500"
                      : index === routeSummary.checkpoints.length - 1
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                />

                {index !== routeSummary.checkpoints.length - 1 && (
                  <div className="w-[2px] h-16 bg-slate-300 mt-1" />
                )}

              </div>

              <div>

                <h3 className="font-semibold text-slate-800">
                  {checkpoint.city}
                </h3>

                <p className="text-sm text-slate-500">
                  {checkpoint.ETA}
                </p>

                <p className="text-xs text-slate-400">
                  {checkpoint.distanceKM} km from start
                </p>

              </div>

            </div>

            {/* Right Weather */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:w-[70%]">

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500">
                  {getWeatherIcon(
                    checkpoint.weather?.conditions
                  )}
                </span>

                <div>
                  <p className="text-xs text-slate-500">
                    Weather
                  </p>

                  <p className="font-medium">
                    {checkpoint.weather?.conditions || "--"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">
                  device_thermostat
                </span>

                <div>
                  <p className="text-xs text-slate-500">
                    Temp
                  </p>

                  <p className="font-medium">
                    {checkpoint.weather?.temperature ?? "--"}°C
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">
                  water_drop
                </span>

                <div>
                  <p className="text-xs text-slate-500">
                    Rain
                  </p>

                  <p className="font-medium">
                    {checkpoint.weather?.precipitationProbability ?? "--"}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500">
                  visibility
                </span>

                <div>
                  <p className="text-xs text-slate-500">
                    Visibility
                  </p>

                  <p className="font-medium">
                    {checkpoint.weather?.visibility ?? "--"} km
                  </p>
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default JourneyTimeline;