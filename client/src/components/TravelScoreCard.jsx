import React from "react";

const TravelScoreCard = ({ routeSummary }) => {
  if (!routeSummary?.checkpoints) return null;

  const weatherData = routeSummary.checkpoints.filter(
    (cp) => cp.weather
  );

  if (weatherData.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-bold mb-2">
          Travel Score
        </h2>

        <p className="text-sm text-slate-500">
          Weather data unavailable
        </p>
      </div>
    );
  }

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

  let score = 100;

  score -= avgRain * 0.5;

  if (avgVisibility < 10) score -= 15;
  if (avgVisibility < 5) score -= 25;

  if (avgWind > 25) score -= 15;
  if (avgWind > 40) score -= 25;

  score = Math.max(0, Math.round(score));

  const status =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Moderate"
      : "Poor";

  const color =
    score >= 80
      ? "text-green-500"
      : score >= 60
      ? "text-blue-500"
      : score >= 40
      ? "text-yellow-500"
      : "text-red-500";

  const ringColor =
    score >= 80
      ? "border-green-500"
      : score >= 60
      ? "border-blue-500"
      : score >= 40
      ? "border-yellow-500"
      : "border-red-500";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <h2 className="text-lg font-bold text-slate-800 mb-4">
        Travel Score
      </h2>

      <div className="flex flex-col items-center">

        <div
          className={`h-20 w-20 rounded-full border-4 ${ringColor}
          flex items-center justify-center`}
        >
          <span className={`text-2xl font-bold ${color}`}>
            {score}
          </span>
        </div>

        <p className={`mt-2 font-semibold ${color}`}>
          {status}
        </p>

        <p className="text-xs text-slate-500 text-center mt-1 mb-5 ">
          {score >= 80
            ? "Recommended for Travel"
            : score >= 60
            ? "Travel with Caution"
            : "Check Conditions Before Departure"}
        </p>

      </div>
    </div>
  );
};

export default TravelScoreCard;