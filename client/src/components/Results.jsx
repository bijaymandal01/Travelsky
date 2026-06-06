import React, { useEffect, useState } from 'react'
import { /*useLocation,*/useSearchParams } from 'react-router-dom'
import axios from "axios";
import RouteInfo from './RouteInfo';
import TravelScoreCard from './TravelScoreCard';
import WeatherHighlights from './WeatherHighlights';
import ConditionsOverview from './ConditionsOverview';
import JourneyTimeline from './JourneyTimeline';
import RiskChart from './RiskChart';
import CheckpointTable from './CheckpointTable';
import LoadingScreen from "./LoadingScreen";
const Results = () => {
const [route, setRoute] = useState(null);
const [loading, setLoading] = useState(true);
const [fromCache, setFromCache] = useState(false);

    // const location = useLocation();
    const [searchParams]=useSearchParams();
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const cacheKey = `${from}-${to}-${date}-${time}`;
//   console.log(location.state);
 useEffect(() => {

  const fetchWeatherData = async () => {

    try {

        const cachedData =
        sessionStorage.getItem(cacheKey);

        if (cachedData) {

        const parsedCache =
            JSON.parse(cachedData);

        const cacheAge =
            Date.now() -
            parsedCache.timestamp;

        const THIRTY_MINUTES =
            30 * 60 * 1000;

        if (
            cacheAge <
            THIRTY_MINUTES
        ) {

            console.log(
            "Loaded from cache"
            );

            setRoute(
            parsedCache.data
            );
             setFromCache(true);
            setLoading(false);

            return;

        }

        // Cache expired
        sessionStorage.removeItem(
            cacheKey
        );

        }

      const response = await axios.post(
        "http://localhost:5000/api/weather/travel",
        {
          from,
          to,
          date,
          time,
        }
      );

      setRoute(response.data);
      setFromCache(false);
      
        const cacheObject = {
        data: response.data,
        timestamp: Date.now(),
        };

        sessionStorage.setItem(
        cacheKey,
        JSON.stringify(cacheObject)
        );

        setLoading(false);

        console.log(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchWeatherData();

}, [from, to, date, time]);

  if (loading && !fromCache) {
    return <LoadingScreen/>;
  }

  console.log(route);
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
    <div className="col-span-12 lg:col-span-8">
      <WeatherHighlights routeSummary={route.weathersInYourRoute} />
    </div>

    <div className="col-span-12 lg:col-span-4">
      <ConditionsOverview routeSummary={route.weathersInYourRoute} />
    </div>

    {/* Full Width Journey Timeline */}
    <div className="col-span-12">
      <JourneyTimeline routeSummary={route.weathersInYourRoute} />
    </div>

  </div>
</div>
  </>
  );

}

export default Results;