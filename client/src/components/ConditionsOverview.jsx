import React from "react";

const ConditionsOverview = ({ routeSummary }) => {
  if (!routeSummary?.checkpoints) return null;

  const weatherData = routeSummary.checkpoints.filter(
    (cp) => cp.weather
  );

  if (weatherData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-bold mb-2">
          Conditions Overview
        </h2>

        <p className="text-sm text-slate-500">
          Weather data unavailable
        </p>
      </div>
    );
  }

  const temperatures = weatherData.map(
    (cp) => cp.weather.temperature || 0
  );

  const rainProbabilities = weatherData.map(
    (cp) => cp.weather.precipitationProbability || 0
  );

  const visibilityValues = weatherData.map(
    (cp) => cp.weather.visibility || 0
  );

  const windValues = weatherData.map(
    (cp) => cp.weather.windSpeed || 0
  );

  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  const avgRain =
    rainProbabilities.reduce((a, b) => a + b, 0) /
    rainProbabilities.length;

  const avgVisibility =
    visibilityValues.reduce((a, b) => a + b, 0) /
    visibilityValues.length;

  const avgWind =
    windValues.reduce((a, b) => a + b, 0) /
    windValues.length;

  const rainRisk =
    avgRain > 60
      ? "High"
      : avgRain > 30
      ? "Moderate"
      : "Low";

  const travelCondition =
    avgRain > 60
      ? "Challenging"
      : avgRain > 30
      ? "Watch Conditions"
      : "Favorable";

  const conditionColor =
    travelCondition === "Favorable"
      ? "bg-green-100 text-green-700"
      : travelCondition === "Watch Conditions"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Conditions Overview
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            Temperature
          </span>

          <span className="font-semibold">
            {minTemp.toFixed(0)}° - {maxTemp.toFixed(0)}°C
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            Rain Risk
          </span>

          <span
            className={`font-semibold ${
              rainRisk === "High"
                ? "text-red-500"
                : rainRisk === "Moderate"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {rainRisk}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            Visibility
          </span>

          <span className="font-semibold">
            {avgVisibility.toFixed(1)} km
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">
            Wind Speed
          </span>

          <span className="font-semibold">
            {avgWind.toFixed(1)} km/h
          </span>
        </div>

        <div className="pt-3 border-t border-slate-200">

          <p className="text-xs text-slate-500 mb-2">
            Travel Conditions
          </p>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${conditionColor}`}
          >
            {travelCondition}
          </span>

        </div>

      </div>

    </div>
  );
};

export default ConditionsOverview;