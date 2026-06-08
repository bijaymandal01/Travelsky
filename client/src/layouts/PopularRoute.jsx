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

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Popular Destinations
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