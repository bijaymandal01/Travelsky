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

  let score = 100;

  let severeCount = 0;
  let moderateCount = 0;

  weatherData.forEach((cp) => {
    const rain =
      cp.weather.precipitationProbability || 0;

    const visibility =
      cp.weather.visibility || 25;

    const wind =
      cp.weather.windSpeed || 0;

    const temperature =
      cp.weather.temperature || 25;

    const condition =
      cp.weather.conditions?.toLowerCase() || "";

    // ===== Severe Conditions =====

    if (rain >= 80) severeCount++;

    if (visibility < 2) severeCount++;
    else if (visibility < 10) moderateCount++;

    if (wind > 50) severeCount++;
    else if (wind > 30) moderateCount++;

    if (
      condition.includes("storm") ||
      condition.includes("thunder")
    ) {
      severeCount++;
    }

    // ===== Heat Risk =====

    if (temperature > 45) {
      score -= 3;
    } else if (temperature > 42) {
      score -= 2;
    }

    // ===== Moderate Rain =====

    if (rain >= 40 && rain < 80) {
      moderateCount++;
    }
  });

  // Route-wide penalties

  score -= severeCount * 8;

  score -= moderateCount * 4;

  // Percentage of affected checkpoints

  const riskRatio =
    (severeCount + moderateCount) /
    weatherData.length;

  if (riskRatio > 0.5) score -= 10;
  else if (riskRatio > 0.3) score -= 5;

  score = Math.max(
    0,
    Math.min(100, Math.round(score))
  );

  const status =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 55
      ? "Moderate Risk"
      : score >= 40
      ? "High Risk"
      : "Avoid Travel";

  const color =
    score >= 85
      ? "text-green-500"
      : score >= 70
      ? "text-blue-500"
      : score >= 55
      ? "text-yellow-500"
      : score >= 40
      ? "text-orange-500"
      : "text-red-500";

  const ringColor =
    score >= 85
      ? "border-green-500"
      : score >= 70
      ? "border-blue-500"
      : score >= 55
      ? "border-yellow-500"
      : score >= 40
      ? "border-orange-500"
      : "border-red-500";

  const recommendation =
    score >= 85
      ? "Recommended for Travel"
      : score >= 70
      ? "Generally Safe Route"
      : score >= 55
      ? "Travel with Caution"
      : score >= 40
      ? "High Weather Risk"
      : "Avoid Travel If Possible";

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
          <span
            className={`text-2xl font-bold ${color}`}
          >
            {score}
          </span>
        </div>

        <p className={`mt-2 font-semibold ${color}`}>
          {status}
        </p>

        <p className="text-xs text-slate-500 text-center mt-1 mb-5">
          {recommendation}
        </p>

      </div>
    </div>
  );
};

export default TravelScoreCard;