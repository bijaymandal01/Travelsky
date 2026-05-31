const axios = require("axios");
require("dotenv").config()

const getEntireRoute = async (
    startLon,
    startLat,
    endLon,
    endLat,
)=>{

    const directionApiResponse = 
        await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`,
            {
                params:{
                    apiKEY: process.env.OPENROUTE_API,
                    start : `${startLon},${startLat}`,
                    end:`${endLon},${endLat}`,
                },
            }
        )

        return {
            distance : directionApiResponse.properties.summary.distance,
            duration : directionApiResponse.properties.summary.duration,
            coordinates : directionApiResponse.geometry.coordinates,
        }


};

module.exports = getEntireRoute;