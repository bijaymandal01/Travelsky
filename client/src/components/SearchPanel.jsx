
import { useState } from "react";
import axios from "axios";

export default function SearchPanel() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [result, setResult] =
    useState(null);

  // FORM SUBMIT

  const handleSearch = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(

          "http://localhost:5000/api/weather/travel",

          {
            from : from,
            to : to,
            date : date,
            time : time,
          }

        );


      setResult(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <>

      <form className="card">

        <h3 className="h4 mb-2">
          Plan Your Journey
        </h3>

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
          onClick={handleSearch}
        >
          Search Route Weather
        </button>

      </form>

      {
        result && (

          <p>
            {result.message}
          </p>

        )
      }

    </>

  );

}

