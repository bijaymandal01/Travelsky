import React from 'react'

export default function PopularRoutes({ setTo }) {
  const routes = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Kolkata",
    "Chennai",
    "Pune",
    "Patna",
    "Ranchi",
    "Ahmedabad",
  ];

  return (
    <div className="mt-8">

      <h3 className="text-lg flex font-semibold text-slate-800 mb-4">
        Popular Destinations<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#155dfc"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg>
      </h3>

      <div className="flex flex-wrap gap-3">

        {routes.map((city) => (
          <button
            key={city}
            onClick={() => setTo(city)}
            className="px-4 py-2 rounded-full border border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition"
          >
            {city}
          </button>
        ))}

      </div>

    </div>
  );
}