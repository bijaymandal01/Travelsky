import React from "react";

const WeatherHighlights = ({ routeSummary }) => {
  if (!routeSummary?.checkpoints) return null;

  const weatherData = routeSummary.checkpoints.filter(
    (cp) => cp.weather
  );

  if (weatherData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-bold mb-2">
          Weather Highlights
        </h2>

        <p className="text-sm text-slate-500">
          Weather data unavailable
        </p>
      </div>
    );
  }

  const avgTemp =
    weatherData.reduce(
      (sum, cp) => sum + (cp.weather.temperature || 0),
      0
    ) / weatherData.length;

  const avgRain =
    weatherData.reduce(
      (sum, cp) =>
        sum + (cp.weather.precipitationProbability || 0),
      0
    ) / weatherData.length;

  const avgVisibility =
    weatherData.reduce(
      (sum, cp) =>
        sum + (cp.weather.visibility || 0),
      0
    ) / weatherData.length;

  const avgWind =
    weatherData.reduce(
      (sum, cp) =>
        sum + (cp.weather.windSpeed || 0),
      0
    ) / weatherData.length;

  const cards = [
    {
      title: "Temperature",
      value: `${avgTemp.toFixed(1)}°C`,
      icon: "🌡️",
    },
    {
      title: "Rain Risk",
      value: `${avgRain.toFixed(0)}%`,
      icon: "💧",
    },
    {
      title: "Visibility",
      value: `${avgVisibility.toFixed(1)} km`,
      icon: "👁️",
    },
    {
      title: "Wind",
      value: `${avgWind.toFixed(1)} km/h`,
      icon: "💨",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Weather Highlights
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-50 rounded-xl p-4"
          >
            <div className="text-2xl mb-2">
              {card.icon}
            </div>

            <p className="text-xs text-slate-500">
              {card.title}
            </p>

            <h3 className="text-lg font-bold text-slate-800">
              {card.value}
            </h3>
          </div>
        ))}

      </div>

    </div>
  );
};

export default WeatherHighlights;