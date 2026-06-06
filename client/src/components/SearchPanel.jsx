import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    navigate(
      `/results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&time=${time}`
    );

  };

  return (

    <form
      className="card"
      onSubmit={handleSearch}
    >

      <h4 className="h4 mb-2">
        Plan Your Journey
      </h4>

      <input
        type="text"
        placeholder="From"
        className="input mb-2"
        value={from}
        onChange={(e) =>
          setFrom(e.target.value)
        }
        required
      />

      <input
        type="text"
        placeholder="To"
        className="input mb-3"
        value={to}
        onChange={(e) =>
          setTo(e.target.value)
        }
        required
      />

      <h6>
        Departure Date
      </h6>

      <input
        type="date"
        className="input mb-3"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        required
      />

      <h6>
        Departure Time
      </h6>

      <input
        type="time"
        className="input mb-3"
        value={time}
        onChange={(e) =>
          setTime(e.target.value)
        }
        required
      />

      <button
        className="btn btn-primary btn-full"
        type="submit"
      >
        Search Route Weather
      </button>

    </form>

  );

}