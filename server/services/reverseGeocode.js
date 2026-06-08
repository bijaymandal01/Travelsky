const axios = require("axios");

require("dotenv").config();

const getreverseGeocode = async (
  joiningCoordinatesWithDistance,
  date,
  time,
  distance,
  duration,
  finalETA
) => {

  const vcfinalDate = new Date(`${date}T${time}:00`);

  vcfinalDate.setMinutes(
    vcfinalDate.getMinutes() +
    duration.hrs * 60 +
    duration.min
  );

  const buildCheckpoint = (
    city,
    lon,
    lat,
    distanceKM,
    timeMinutes
  ) => {

    const departureDateTime = new Date(
      `${date}T${time}:00`
    );

    const eta = new Date(
      departureDateTime.getTime() +
      timeMinutes * 60 * 1000
    );

    const vcDateTime =
      `${eta.getFullYear()}-${
        String(eta.getMonth() + 1).padStart(2, "0")
      }-${
        String(eta.getDate()).padStart(2, "0")
      }T${
        String(eta.getHours()).padStart(2, "0")
      }:00:00`;

    return {
      city,
      distanceKM,
      lon,
      lat,
      finalETA,
      vcDateTime,

      timeTaken: {
        hrs: Math.floor(timeMinutes / 60),
        min: timeMinutes % 60,
      },

      ETA: eta.toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };
  };

  try {

    const results = await Promise.allSettled(

      joiningCoordinatesWithDistance.map(
        async ({
          lon,
          lat,
          distanceKM,
          timeMinutes
        }) => {
  
          const reverseGeocode =
            await axios.get(
              "https://nominatim.openstreetmap.org/reverse",
              {
                params: {
                  format: "jsonv2",
                  lat,
                  lon,
                  addressdetails: 1,
                  "accept-language": "en",
                },
                headers: {
                  "User-Agent": "route-planner/1.0",
                  Accept: "application/json",
                },
                timeout: 6000,
              }
            );
          const city =
            reverseGeocode.data.address
              ?.state_district ||
            reverseGeocode.data.address
              ?.city ||
            reverseGeocode.data.address
              ?.county ||
            "Unknown";

          return buildCheckpoint(
            city,
            lon,
            lat,
            distanceKM,
            timeMinutes
          );
        
        }
      )
      
    );

    const intermediateCities = results
      .filter(
        result =>
          result.status === "fulfilled"
      )
      .map(
        result => result.value
      );

    if (
      intermediateCities.length === 0
    ) {
      throw new Error(
        "Nominatim failed for all checkpoints"
      );
    }

    return processCities(
      intermediateCities,
      distance,
      duration,
      finalETA,
      vcfinalDate
    );

  } catch (error) {

    console.log(
      "nominatim: reverse geocode failure, calling fallback"
    );
try{
    const results = await Promise.allSettled(

      joiningCoordinatesWithDistance.map(
        async ({
          lon,
          lat,
          distanceKM,
          timeMinutes
        }) => {

          const reverseGeocode =
            await axios.get(
              "https://api.geoapify.com/v1/geocode/reverse",
              {
                params: {
                  lat,
                  lon,
                  apiKey:
                    process.env.GEOAPIFY_KEY,
                },
                headers: {
                  "User-Agent": "route-planner/1.0",
                  Accept: "application/json",
                },
                timeout:6000,
              }
            );

          const city =
            reverseGeocode.data.features?.[0]
              ?.properties
              ?.state_district ||
            reverseGeocode.data.features?.[0]
              ?.properties
              ?.county ||
            reverseGeocode.data.features?.[0]
              ?.properties
              ?.city ||
            "Unknown";

          return buildCheckpoint(
            city,
            lon,
            lat,
            distanceKM,
            timeMinutes
          );
        }
      )

    );

    const intermediateCities = results
      .filter(
        result =>
          result.status === "fulfilled"
      )
      .map(
        result => result.value
      );

    return processCities(
      intermediateCities,
      distance,
      duration,
      finalETA,
      vcfinalDate
    );
  }catch(error){
    console.log("geoapify reverse geocode also failed.")
  } 
}
};

function processCities(
  intermediateCities,
  distance,
  duration,
  finalETA,
  vcfinalDate
) {

  const uniqueCities = [];
  const seen = new Set();

  for (const item of intermediateCities) {

    if (
      item.city &&
      !seen.has(item.city)
    ) {

      seen.add(item.city);
      uniqueCities.push(item);

    }
  }

  if (
    uniqueCities.length > 0
  ) {

    uniqueCities[0].distanceKM = 0;

    uniqueCities[
      uniqueCities.length - 1
    ].distanceKM = distance;

    uniqueCities[
      uniqueCities.length - 1
    ].timeTaken.hrs =
      duration.hrs;

    uniqueCities[
      uniqueCities.length - 1
    ].timeTaken.min =
      duration.min;

    uniqueCities[
      uniqueCities.length - 1
    ].ETA =
      finalETA;

    uniqueCities[
      uniqueCities.length - 1
    ].vcDateTime =
      `${vcfinalDate.getFullYear()}-${
        String(
          vcfinalDate.getMonth() + 1
        ).padStart(2, "0")
      }-${
        String(
          vcfinalDate.getDate()
        ).padStart(2, "0")
      }T${
        String(
          vcfinalDate.getHours()
        ).padStart(2, "0")
      }:00:00`;
  }

  return uniqueCities;
}

module.exports = getreverseGeocode;