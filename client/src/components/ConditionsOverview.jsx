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

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <h2 className="text-lg font-bold text-slate-800 mb-4">
        What To Watch For
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Rain */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold mb-2">
            🌧 Rain Expected
          </h3>

          {rainAlerts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No alerts
            </p>
          ) : (
            rainAlerts.slice(0, 3).map((cp) => (
              <div key={cp.city} className="mb-2">
                <p className="font-medium text-sm">
                  {cp.city}
                </p>

                <p className="text-xs text-slate-500">
                  {cp.weather.precipitationProbability}% Rain
                </p>
              </div>
            ))
          )}
        </div>

        {/* Visibility */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold mb-2">
            👁️ Low Visibility
          </h3>

          {visibilityAlerts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No alerts
            </p>
          ) : (
            visibilityAlerts.slice(0, 3).map((cp) => (
              <div key={cp.city} className="mb-2">
                <p className="font-medium text-sm">
                  {cp.city}
                </p>

                <p className="text-xs text-slate-500">
                  {cp.weather.visibility} km
                </p>
              </div>
            ))
          )}
        </div>

        {/* Heat */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold mb-2">
            🌡️ Extreme Heat
          </h3>

          {heatAlerts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No alerts
            </p>
          ) : (
            heatAlerts.slice(0, 3).map((cp) => (
              <div key={cp.city} className="mb-2">
                <p className="font-medium text-sm">
                  {cp.city}
                </p>

                <p className="text-xs text-slate-500">
                  {cp.weather.temperature}°C
                </p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};

export default ConditionsOverview;