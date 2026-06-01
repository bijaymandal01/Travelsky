const axios = require("axios");
require("dotenv").config();

const getreverseGeocode = async (
    joiningCoordinatesWithDistance,
    date,
    time,
    distance, 
    duration,
    finalETA,
) => {
try{
          const intermediateCities = [];
  
          for (let i = 0; i < joiningCoordinatesWithDistance.length; i++) {
              const {lon, lat, distanceKM,timeMinutes} = joiningCoordinatesWithDistance[i];
              // console.log(lon + " "+ lat+" "+distanceKM)
  
              const reverseGeocode = 
                await axios.get(
                  "https://nominatim.openstreetmap.org/reverse",
                  {
                    params: {
                        format: "jsonv2",
                        lat,
                        lon,
                        addressdetails: 1
                      },
                      headers: {
                        "User-Agent": "route-planner/1.0",
                        "Accept": "application/json"
                      }
  
                  }
                )
                // console.log(reverseGeocode.data.address.state_district)
                const city = reverseGeocode.data.address.state_district ||reverseGeocode.data.address.city;
                const departureDateTime =new Date(`${date}T${time}:00`);
  
                const eta = new Date( 
                  departureDateTime.getTime()+timeMinutes*60*1000
                )
  
            intermediateCities.push({
              city,
              distanceKM,
              lon,
              lat,
              finalETA,
              timeTaken : {
                hrs : Math.floor(timeMinutes / 60),
                min : timeMinutes % 60,
              },
              ETA : eta.toLocaleString(
                "en-IN",{
                  day:"numeric",
                  month:"short",
                  year:"numeric",
                  hour:"2-digit",
                  minute:"2-digit",
                }
              )
            });
          }
    //filtering dublicate cities
            const uniqueCities = [];
            const seen = new Set();
  
            for (const item of intermediateCities) {
              if (!seen.has(item.city)) {
                seen.add(item.city);
                uniqueCities.push(item);
              }
            }
  
            //explicetly saving starting and distination 
              uniqueCities[0].distanceKM =0;
              uniqueCities[uniqueCities.length-1].distanceKM=distance;
              uniqueCities[uniqueCities.length-1].timeTaken.hrs=duration.hrs;
              uniqueCities[uniqueCities.length-1].timeTaken.min=duration.min;
              uniqueCities[uniqueCities.length-1].ETA=finalETA;
  
  
            return uniqueCities;


}catch(error){

}


};
module.exports = getreverseGeocode