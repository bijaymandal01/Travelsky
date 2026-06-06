const axios = require("axios");
const apiLogger = require("../utils/apiLogger");
require("dotenv").config()

const getCoordinatesOfPointAPointB = async(place)=>{
    try{
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
                    timeout : 3000,
                }
            );

            return {
                lon : geocodeResponse.data.features[0].geometry.coordinates[0],
                lat : geocodeResponse.data.features[0].geometry.coordinates[1]
        };


            
        
        
    }catch(error){

        console.log(`openrouteservice is slow. switching to fallback `)

        try {
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
             }
        )
        

        return {
            lon :Number(geocodeResponse.data[0].lon),
            lat :Number(geocodeResponse.data[0].lat)
        }
            
        } catch (error) {
            console.log(`nominatim failed.`)
            
        }



    }
};
module.exports = getCoordinatesOfPointAPointB;
