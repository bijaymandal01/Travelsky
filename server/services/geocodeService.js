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

            
        } catch (error) {
        console.log(`Geoaplify geocode failed.`)

            
        }



    }
};
module.exports = getCoordinatesOfPointAPointB;
