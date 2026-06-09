const axios = require("axios");
const apiLogger = require("../utils/apiLogger");
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
             }
        )
        

        return {
            lon :Number(geocodeResponse.data[0].lon),
            lat :Number(geocodeResponse.data[0].lat)
        }
            


            
        
        
    }catch(error){

        console.log(`nominatim failed.`)

        try {
            const geocodeResponse = await axios.get(
                    "https://geocoding-api.open-meteo.com/v1/search",
                    {
                        params: {
                        name: place,
                        count: 1,
                        language: "en",
                        format: "json"
                        }
                    }
                    );

                    const result =
                    geocodeResponse.data.results?.[0];

                    return {
                    lat: result.latitude,
                    lon: result.longitude,
                    city: result.name
                    };



            
        } catch (error) {

        console.log(`open-meteo geocode failed.`)

            const geocodeResponse = await axios.get(
                `https://api.geoapify.com/v1/geocode/search`,
                { 
                    params:{
                        text:place,
                        lang:"en",
                        limit:10,
                        type : "city",
                        format:"json",
                        apiKey : process.env.GEOAPIFY_KEY,
                    },
                    timeout:3000,
                }
            )

            return {
                lon:geocodeResponse.data.results?.[0].lon,
                lat:geocodeResponse.data.results?.[0].lat,

            }
            
        }



    }
};
module.exports = getCoordinatesOfPointAPointB;
