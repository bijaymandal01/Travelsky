const axios = require("axios");
require("dotenv").config();

const getCoordinatesOfPointAPointB = async (
  place
) => {
    const aliases = {
  banaras: "varanasi",
  benares: "varanasi",
  bombay: "mumbai",
  calcutta: "kolkata",
  madras: "chennai",
  bangalore: "bengaluru",
  poona: "pune",
  baroda: "vadodara",
  trivandrum: "thiruvananthapuram",
  cawnpore: "kanpur",
  simla: "shimla",
  pondicherry: "puducherry",
  alleppey: "alappuzha",
  calicut: "kozhikode",
  cochin: "kochi",
  vizag: "visakhapatnam",
  hubli: "hubballi",
  belgaum: "belagavi",
  gulbarga: "kalaburagi",
  mangalore: "mangaluru"
};

const searchTerm =
  aliases[
    place
      .replace(",India", "")
      .trim()
      .toLowerCase()
  ] ||
  place
    .replace(",India", "")
    .trim()
    .toLowerCase();

  // =====================================
  // NOMINATIM
  // =====================================

  try {

    const geocodeResponse =
      await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: place,
            format: "jsonv2",
            limit: 10,
            addressdetails: 1,
          },
          headers: {
            "User-Agent": "travelsky/1.0",
            Accept: "application/json",
          },
          timeout: 5000,
        }
      );

    const result =
      geocodeResponse.data.find(
        item =>
          item.category === "place" &&
          (
            item.type === "city" ||
            item.type === "town" ||
            item.type === "administrative" ||
            item.type === "village"
          ) &&
          item.name
            ?.trim()
            .toLowerCase() === searchTerm &&
          item.display_name
            ?.toLowerCase()
            .includes("india")
      );

    if (result) {

      console.log(
        "Primary key worked."
      );

      return {
        lon: Number(result.lon),
        lat: Number(result.lat),
      };

    }

    throw new Error(
      "No valid Nominatim result"
    );

  } catch (error) {

    console.log(
      "nominatim failed."
    );

    // =====================================
    // OPEN-METEO
    // =====================================

    try {

      const geocodeResponse =
        await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: searchTerm,
              count: 10,
              language: "en",
              format: "json",
            },
            timeout: 5000,
          }
        );

      const result =
        geocodeResponse.data.results?.find(
          item =>
            item.name
              ?.trim()
              .toLowerCase() === searchTerm &&
            item.country === "India"
        );

      if (result) {

        console.log(
          "Open-Meteo worked."
        );

        return {
          lat: result.latitude,
          lon: result.longitude,
        };

      }

      throw new Error(
        "No valid Open-Meteo result"
      );

    } catch (error) {

      console.log(
        "open-meteo geocode failed."
      );

      // =====================================
      // GEOAPIFY
      // =====================================

      try {

        const geocodeResponse =
          await axios.get(
            "https://api.geoapify.com/v1/geocode/search",
            {
              params: {
                text: place,
                lang: "en",
                limit: 10,
                type: "city",
                format: "json",
                apiKey:
                  process.env.GEOAPIFY_KEY,
              },
              timeout: 5000,
            }
          );

        const result =
          geocodeResponse.data.results?.find(
            item => {

              const locationName =
                (
                  item.city ||
                  item.county ||
                  item.state_district ||
                  ""
                )
                  .trim()
                  .toLowerCase();

              return (
                locationName === searchTerm &&
                item.country === "India"
              );

            }
          );

        if (result) {

          console.log(
            "Geoapify worked."
          );

          return {
            lon: result.lon,
            lat: result.lat,
          };

        }

        throw new Error(
          "No valid Geoapify result"
        );

      } catch (error) {

        console.log(
          "geoapify failed."
        );

        return null;

      }

    }

  }

};

module.exports =
  getCoordinatesOfPointAPointB;