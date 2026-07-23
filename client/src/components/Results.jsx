import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import RouteInfo from "./RouteInfo";
import TravelScoreCard from "./TravelScoreCard";
import WeatherHighlights from "./WeatherHighlights";
import ConditionsOverview from "./ConditionsOverview";
import JourneyTimeline from "./JourneyTimeline";
import LoadingScreen from "./LoadingScreen";
import posthog from "posthog-js";
import NoDataFoundPage from "../Pages/NoDataFoundPage";

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

        // Google analytics Success Event
        if (window.gtag) {
          window.gtag("event", "results_loaded", {
            from,
            to,
          });
        }
        //posthogsuccess event tracking
        posthog.capture(
          "results_loaded",
          {
            from,
            to,
          }
        );

        setRoute(response.data);
      } 
      catch (error) {
        console.log(error);

        // Google anytics Failure Event
        if (window.gtag) {
          window.gtag("event", "results_failed", {
            from,
            to,
          });
        }
          //posthog failure event tracking
          posthog.capture(
          "results_failed",
          {
            from,
            to,
          }
        );

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
    return <NoDataFoundPage/> ;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-8">
          <RouteInfo routeSummary={route.weathersInYourRoute} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <TravelScoreCard routeSummary={route.weathersInYourRoute} />
        </div>

        <div className="col-span-12">
          <WeatherHighlights routeSummary={route.weathersInYourRoute} />
        </div>

        <div className="col-span-12">
          <ConditionsOverview routeSummary={route.weathersInYourRoute} />
        </div>

        <div className="col-span-12">
          <JourneyTimeline 
          routeSummary={route.weathersInYourRoute} 
            start={route.weathersInYourRoute.route.start}
            destination={route.weathersInYourRoute.route.destination}
          />
        </div>

      </div>
    </div>
  );
};

export default Results;