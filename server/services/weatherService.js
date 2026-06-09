const axios = require("axios");
const pLimit = require("p-limit").default;
require("dotenv").config();

const getWeather = async (
    date,
    time,
    uniqueCities
) => {

    try {

        const limit = pLimit(3);

        // console.log(
        //     "Trying primary key:",
        //     process.env.VISUALCROSSING_KEY
        // );

        const weatherResults =
            await Promise.allSettled(

                uniqueCities.map(city =>
                    limit(async () => {

                        const response =
                            await axios.get(
                                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city.city)}/${city.vcDateTime}`,
                                {
                                    params: {
                                        key: process.env.VISUALCROSSING_KEY,
                                        unitGroup: "metric"
                                    },
                                    timeout: 10000
                                }
                            );

                        const targetTime =
                            city.vcDateTime.split("T")[1];

                        const matchingHour =
                            response.data.days?.[0]?.hours?.find(
                                hour =>
                                    hour.datetime === targetTime
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

        const successfulResults =
            weatherResults
                .filter(
                    result =>
                        result.status === "fulfilled"
                )
                .map(
                    result => result.value
                );

        const failedResults =
            weatherResults.filter(
                result =>
                    result.status === "rejected"
            );

        if (failedResults.length > 0) {

            console.log(
                `Primary key failed requests: ${failedResults.length}`
            );

            failedResults.forEach(result => {

                console.log(
                    "Status:",
                    result.reason?.response?.status
                );

                console.log(
                    "Message:",
                    result.reason?.message
                );

            });

        }

        // FIRST KEY SUCCESS
        if (successfulResults.length > 0) {

            console.log(
                "Primary key worked."
            );

            return successfulResults;

        }

        // ALL REQUESTS FAILED -> TRY SECOND KEY

        console.log(
            "Primary key failed completely. Trying backup key..."
        );

        const backupLimit = pLimit(3);

        const backupWeatherResults =
            await Promise.allSettled(

                uniqueCities.map(city =>
                    backupLimit(async () => {

                        const response =
                            await axios.get(
                                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city.city)}/${city.vcDateTime}`,
                                {
                                    params: {
                                        key: process.env.VISUALCROSSING_SECOND_KEY,
                                        unitGroup: "metric"
                                    },
                                    timeout: 10000
                                }
                            );

                        const targetTime =
                            city.vcDateTime.split("T")[1];

                        const matchingHour =
                            response.data.days?.[0]?.hours?.find(
                                hour =>
                                    hour.datetime === targetTime
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

        const backupSuccessfulResults =
            backupWeatherResults
                .filter(
                    result =>
                        result.status === "fulfilled"
                )
                .map(
                    result => result.value
                );

        const backupFailedResults =
            backupWeatherResults.filter(
                result =>
                    result.status === "rejected"
            );

        if (backupFailedResults.length > 0) {

            console.log(
                `Backup key failed requests: ${backupFailedResults.length}`
            );

            backupFailedResults.forEach(result => {

                console.log(
                    "Status:",
                    result.reason?.response?.status
                );

                console.log(
                    "Message:",
                    result.reason?.message
                );

            });

        }

        return backupSuccessfulResults;

    } catch (error) {

        console.log(
            "WEATHER SERVICE ERROR:"
        );

        console.log(
            error.message
        );

        return [];

    }

};

module.exports = getWeather;