import React from "react";

const ConditionsOverview = ({ routeSummary }) => {
  if (!routeSummary?.checkpoints) return null;

  const weatherData = routeSummary.checkpoints.filter(
    (cp) => cp.weather
  );

  const rainAlerts = weatherData.filter(
    (cp) =>
      (cp.weather.precipitationProbability || 0) >= 50
  );

  const visibilityAlerts = weatherData.filter(
    (cp) =>
      (cp.weather.visibility || 99) < 10
  );

  const heatAlerts = weatherData.filter(
    (cp) =>
      (cp.weather.temperature || 0) >= 42
  );

  const AlertCard = ({
    title,
    alerts,
    metricKey,
    formatter,
    label,
    compare = "max",
  }) => {
    if (alerts.length === 0) {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold mb-2">
            {title}
          </h3>

          <p className="text-sm text-slate-500">
            No alerts
          </p>
        </div>
      );
    }

    const topLocation = alerts.reduce((best, current) => {
      if (compare === "min") {
        return current.weather[metricKey] <
          best.weather[metricKey]
          ? current
          : best;
      }

      return current.weather[metricKey] >
        best.weather[metricKey]
        ? current
        : best;
    });

    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

        <h3 className="font-semibold mb-3">
          {title}
        </h3>

        <p className="text-sm mb-4">
          <span className="font-semibold">
            {alerts.length}
          </span>{" "}
          location
          {alerts.length > 1 ? "s" : ""} affected
        </p>

        <div className="mb-4">

          <p className="text-sm font-semibold">
            {compare === "min"
              ? "Lowest"
              : "Highest"}
          </p>

          <p className="text-sm text-slate-600">
            {topLocation.city} (
            {formatter(
              topLocation.weather[metricKey]
            )}
            )
          </p>

        </div>

        <div>

          <p className="text-sm font-semibold mb-1">
            Affected Areas
          </p>

          <p className="text-sm text-slate-600">
            {alerts
              .map((cp) => cp.city)
              .join(", ")}
          </p>

        </div>

      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-black shadow-sm p-5">

      <h2 className="text-lg font-bold text-slate-800 mb-4">
        What To Watch For
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <AlertCard
          title="🌧 Rain Expected"
          alerts={rainAlerts}
          metricKey="precipitationProbability"
          formatter={(value) => `${value}%`}
        />

        <AlertCard
          title="👁️ Low Visibility"
          alerts={visibilityAlerts}
          metricKey="visibility"
          formatter={(value) => `${value} km`}
          compare="min"
        />

        <AlertCard
          title="🌡️ Extreme Heat"
          alerts={heatAlerts}
          metricKey="temperature"
          formatter={(value) => `${value}°C`}
        />

      </div>

    </div>
  );
};

export default ConditionsOverview;