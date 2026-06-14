import { useState } from "react";
import { useNavigate } from "react-router-dom";
import posthog from "posthog-js";
import PopularRoutes from "../layouts/PopularRoute";

export default function SearchPanel() {

  const navigate = useNavigate();

  // Load saved form data from sessionStorage
  const savedForm =
    JSON.parse(
      sessionStorage.getItem("searchForm")
    ) || {};

  const [from, setFrom] =
    useState(savedForm.from || "");

  const [to, setTo] =
    useState(savedForm.to || "");

  const [date, setDate] =
    useState(savedForm.date || "");

  const [time, setTime] =
    useState(savedForm.time || "");

  const handleSearch = (e) => {

    e.preventDefault();
    
    //google analytics tracking code integration
    if (window.gtag) {
        window.gtag("event", "search_route", {
          from,
          to,
          date,
        });
      }
//.........................................................
//postHog tracking integration 
    posthog.capture(
      "search_route",
      {
        from,
        to,
        date,
      }
    );
//.........................................................
    // Save form values
    sessionStorage.setItem(
      "searchForm",
      JSON.stringify({
        from,
        to,
        date,
        time,
      })
    );
    const From_WhichPlaceof_INDIA =`${from},India`;
    const To_WhichPlaceof_INDIA =`${to},India`;
    

    navigate(
      `/results?from=${encodeURIComponent(From_WhichPlaceof_INDIA)}&to=${encodeURIComponent(To_WhichPlaceof_INDIA)}&date=${date}&time=${time}`
    );

  };

  return (

<form
  className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-8"
  onSubmit={handleSearch}
>

  <h3 className="text-2xl font-bold text-slate-800 mb-2">
    Plan Your Journey
  </h3>

  <p className="text-slate-500 text-sm mb-6">
    Check weather conditions across your entire route.
  </p>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="From"
      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
      value={from}
      onChange={(e) => setFrom(e.target.value)}
      required
    />

    <input
      type="text"
      placeholder="To"
      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
      value={to}
      onChange={(e) => setTo(e.target.value)}
      required
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Departure Date
        </label>

        <input
          type="date"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Departure Time
        </label>

        <input
          type="time"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md"
    >
      Search Route Weather
    </button>

  </div>
<PopularRoutes setTo={setTo} />

</form>


  );

}