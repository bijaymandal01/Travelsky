const axios = require("axios");
require("dotenv").config()

const getEntireRoute = async (
    start,
    end
)=>{
try{
    const directionApiResponse = 
    await axios.get(` https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}`,
        {
            params: {
                overview: "full",
                geometries: "geojson"
            }
        }
    )
    return {
        distance : directionApiResponse.data.routes[0].distance,
        duration :directionApiResponse.data.routes[0].duration,
        coordinates : directionApiResponse.data.routes[0].geometry.coordinates,
    }


}catch(error){

    console.log(` distance api failed. switching to fallback`)



     const directionApiResponse = 
    await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`,
        {
            params:{
                api_key: process.env.OPENROUTE_API,
                start : `${start.lon},${start.lat}`,
                end:`${end.lon},${end.lat}`,
            },
            timeout:6000,
        }
    )
 
    return {
        distance : directionApiResponse.data.features[0].properties.summary.distance,
        duration : directionApiResponse.data.features[0].properties.summary.duration,
        coordinates : directionApiResponse.data.features[0].geometry.coordinates,
    }


}
    
    
};

module.exports = getEntireRoute;

