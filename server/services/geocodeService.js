const axios = require("axios");
require("dotenv").config()

const getCoordinatesOfPointAPointB = async(place)=>{
    try{

                    const geocodeResponse= await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params :{
                    q : place,
                    format: "jsonv2",
                    limit: 1,
                } ,
                headers: {
                    "User-Agent": "travelsky/1.0",
                    "Accept": "application/json",
                },
                timeout :6000,            }
        )
        return {
            lon :Number(geocodeResponse.data[0].lon),
            lat :Number(geocodeResponse.data[0].lat)
        }
            
        
        
    }catch(error){

        console.log(`some services is slow switching to fallback `)

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
                lon : geocodeResponse.data.features[0].geometry.coordinates[0],
                lat : geocodeResponse.data.features[0].geometry.coordinates[1]
        };

    }
};
module.exports = getCoordinatesOfPointAPointB;
