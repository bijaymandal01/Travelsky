const axios = require("axios");
const pLimit = require("p-limit").default;
const apiLogger = require("../utils/apiLogger");
require("dotenv").config();

const getWeather = async (
    date,
    time,
    uniqueCities
) => {

    try {
            const limit = pLimit(3);
        console.log('visual crossing key =>'+ process.env.VISUALCROSSING_KEY)
        const weatherResults = await Promise.allSettled(

            uniqueCities.map( (city) =>
                limit(async () => {
                const response = await axios.get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.city}/${city.vcDateTime}`,
                    {
                        params: {
                            key: process.env.VISUALCROSSING_KEY,
                            unitGroup: "metric"
                        },
                        timeout:10000,
                       
                    }
                );

                const targetTime = city.vcDateTime.split("T")[1];

                const matchingHour =
                    response.data.days[0].hours.find(
                        hour => hour.datetime === targetTime
                    );

                return {
                    city: city.city,
                    distanceKM: city.distanceKM,
                    ETA: city.ETA,
                    vcDateTime: city.vcDateTime,

                    temperature: matchingHour?.temp,
                    feelsLike: matchingHour?.feelslike,
                    humidity: matchingHour?.humidity,
                    conditions: matchingHour?.conditions,
                    precipitation: matchingHour?.precip,
                    precipitationProbability: matchingHour?.precipprob,
                    windSpeed: matchingHour?.windspeed,
                    windDirection: matchingHour?.winddir,
                    cloudCover: matchingHour?.cloudcover,
                    visibility: matchingHour?.visibility,
                    uvIndex: matchingHour?.uvindex,
                };

        })
    )
);
        const successfulResults = weatherResults
            .filter(result => result.status === "fulfilled")
            .map(result => result.value);

        const failedResults = weatherResults
            .filter(result => result.status === "rejected");

        if (failedResults.length > 0) {
            console.log(
                `Weather requests failed: ${failedResults.length}`
            );

            failedResults.forEach(result => {
                console.log(result.reason?.message);
            });
        }
        console.log(successfulResults)

        return successfulResults;


    } catch (error) {

        console.log("WEATHER ERROR:");
        console.log(error.message);

        return [];

    }

};

module.exports = getWeather;