import React from "react";

const RouteInfo = ({ routeSummary }) => {
  if (!routeSummary?.route) return null;

  const departureDateTime = new Date(
    `${routeSummary.route.departureDate}T${routeSummary.route.departureTime}`
  );

  const formattedDeparture = departureDateTime.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const cards = [
    {
      title: "Distance",
      value: `${routeSummary.route.distance} km`,
      icon: "📍",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Duration",
      value: `${routeSummary.route.duration.hrs}h ${routeSummary.route.duration.min}m`,
      icon: "⏱️",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Departure",
      value: formattedDeparture,
      icon: "🚗",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Arrival",
      value: routeSummary.route.finalETA,
      icon: "🏁",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6">

      {/* Route Header */}
      <div className="mb-6">
        <p className="text-2xl font-bold text-slate-500 mb-1">
          Journey Overview
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          {routeSummary.route.start}
          <span className="mx-3 text-slate-400">→</span>
          {routeSummary.route.destination}
        </h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:shadow-md hover:bg-white transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">

              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg ${card.color}`}
              >
                {card.icon}
              </div>

            </div>

            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
              {card.title}
            </p>

            <p className="font-semibold text-slate-800 text-sm md:text-base break-words">
              {card.value}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RouteInfo;