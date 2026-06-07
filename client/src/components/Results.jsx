import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import RouteInfo from "./RouteInfo";
import TravelScoreCard from "./TravelScoreCard";
import WeatherHighlights from "./WeatherHighlights";
import ConditionsOverview from "./ConditionsOverview";
import JourneyTimeline from "./JourneyTimeline";
import RiskChart from "./RiskChart";
import CheckpointTable from "./CheckpointTable";
import LoadingScreen from "./LoadingScreen";

const Results = () => {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post(
          "https://travelsky.onrender.com/api/weather/travel",
          {
            from,
            to,
            date,
            time,
          }
        );

        setRoute(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [from, to, date, time]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!route) {
    return <h2>No Data Found</h2>;
  }

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">

          {/* Top Row */}
          <div className="col-span-12 lg:col-span-8">
            <RouteInfo routeSummary={route.weathersInYourRoute} />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <TravelScoreCard routeSummary={route.weathersInYourRoute} />
          </div>

          {/* Second Row */}
         <div className="col-span-12">
            <WeatherHighlights routeSummary={route.weathersInYourRoute} />
          </div>

          <div className="col-span-12">
            <ConditionsOverview routeSummary={route.weathersInYourRoute} />
          </div>

          {/* Timeline */}
          <div className="col-span-12">
            <JourneyTimeline routeSummary={route.weathersInYourRoute} />
          </div>

          {/* // Optional Components
          <div className="col-span-12">
            <RiskChart routeSummary={route.weathersInYourRoute} />
          </div>

          <div className="col-span-12">
            <CheckpointTable routeSummary={route.weathersInYourRoute} />
          </div> */}

        </div>
      </div>
    </>
  );
};

export default Results;