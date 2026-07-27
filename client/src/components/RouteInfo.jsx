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
  const displayStart = routeSummary.route.start?.replace(",India", "").toUpperCase();
  const displayDestination = routeSummary.route.destination?.replace(",India", "").toUpperCase();

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
    <div className="bg-white rounded-3xl border border-black shadow-sm p-5 md:p-6">

      {/* Route Header */}
      <div className="mb-6 md:flex md:justify-between">
        <h1 className="text-lg text-center break-all md:text-3xl font-bold text-slate-800 flex flex-col md:flex-row md:items-center md:justify-center gap-2">
          {displayStart}
          →
          {displayDestination}
        </h1>

        <a
          href={`https://www.google.com/maps/dir/${displayStart}/${displayDestination}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex mt-4 items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/40 hover:bg-blue-700 transition"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping"></span>
            <span className="relative h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
          </span>

          View Live Map <span className="material-symbols-outlined text-[18px]">north_east</span>
        </a>
      </div>

      {/* Metrics */}
      <div>
        

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        {cards.map((card, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-slate-100 bg-slate-50 p-4 "
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

            <p className="font-semibold text-slate-800 text-sm md:text-base ">
              {card.value}
            </p>
          </div>
        ))}

      </div>
<div className="flex justify-center mt-5 md:hidden">
  <a
    href={`https://www.google.com/maps/dir/${displayStart}/${displayDestination}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex w-full max-w-xs justify-center items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/40 hover:bg-blue-700 transition"
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping"></span>
      <span className="relative h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
    </span>

    View Live Map <span className="material-symbols-outlined text-[18px]">north_east</span>
  </a>
</div>
      </div>
    </div>
  );
};

export default RouteInfo;