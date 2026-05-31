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

        return directionApiResponse.data.features[0]


};

module.exports = getEntireRoute;