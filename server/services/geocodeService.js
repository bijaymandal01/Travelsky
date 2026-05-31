const axios = require("axios");
require("dotenv").config()

const getCoordinatesOfPointAPointB = async(place)=>{

    const geocodeResponse = await axios.get(
        `https://api.openrouteservice.org/geocode/search`,
        {
            params: {
                api_key: process.env.OPENROUTE_API,
                text: place,
                "boundary.country": "IN",
                layers: "venue,address",
                size: 1,
            },
        }
    );
    return {
        nameOfPlace : place,
        lon : response.datadata.features[0].geometry.coordinates[0],
        lat : response.datadata.features[0].geometry.coordinates[0]
    };

};
module.exports = {getCoordinatesOfPointAPointB,}
