const axios = require("axios");
const getCoordinatesOfPointAPointB = require("../services/geocodeService");
const getEntireRoute = require("../services/directionsService");
const getfinalETA = require("../services/etaServices");
const generateCheckpoints = require("../services/checkpointServices");
const getreverseGeocode = require("../services/reverseGeocode");
const getWeather = require("../services/weatherService");
require("dotenv").config();

const getTravelWeather = async (req, res) => {
  try {
    console.log(req.body);

    const { from, to, date, time } = req.body;

    // console.log(from);
    // console.log(to);

//...............................................................
    //finding coodinates of start(from) and destination(to) 
//.............................................................
    const start= await getCoordinatesOfPointAPointB(from)
    const end= await getCoordinatesOfPointAPointB(to)
    console.log("start "+start.lon +" "+ start.lat);
    console.log("end "+end.lon +" "+ end.lat);

/* //modules are created no need of this code anymore.

     const geocodeResponseFROM = await axios.get(
      `https://api.openrouteservice.org/geocode/search`,
      {
        params: {
          api_key: process.env.OPENROUTE_API,
          text: from,
          "boundary.country": "IN",
          layers: "venue,address",
          size: 1,
        },
      }
    );
    const geocodeResponseTO = await axios.get(
      `https://api.openrouteservice.org/geocode/search`,
      {
        params: {
          api_key: process.env.OPENROUTE_API,
          text: to,
          "boundary.country": "IN",
          layers: "venue,address",
          size: 1,
        },
      }
    );

*/

    //.............................................................
    //storing coordinates of From and TO in array of object
    //............................................................

    const locations = [
      {
        name: from,
        lon:start.lon,
        lat:start.lat,
      },
      {
        name: to,
        lon:  end.lon,
        lat:  end.lat,
      },
    ];

/*

  console.log(locations[0])
  console.log(locations[1])
  
  console.log(locations[0].lon)
  console.log(locations[0].lat)
  
  console.log(locations[1].lon)
  console.log(locations[1].lat)
  */
  
//......................................................
//using direction api to get data 
// like distance, duration, geomerty, & coordinates 
//.......................................................

    const distanceDurationCoordinates = await  getEntireRoute(
      start,
      end
    )

/* //modules are created no need of this code anymore.

  const directionApiResponse = 
  await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTE_API}&start=${locations[0].lon},${locations[0].lat}&end=${locations[1].lon},${locations[1].lat}`)
  
  */

  const distanceAndDurationCoordinatesARRAY = [
          {
            distance: distanceDurationCoordinates.distance,
            duration:distanceDurationCoordinates.duration,
            coordinates: distanceDurationCoordinates.coordinates,
          },
        ];
    // console.log(distanceAndDuration[0])

    //...........................................................
    //conversion of distance to km and duration to hrs
    //............................................................
    const distance = Number(((distanceAndDurationCoordinatesARRAY[0].distance)/1000).toFixed(2))
    console.log(distance + " km")
    
      const totalRouteDurationINSeconds =
  distanceAndDurationCoordinatesARRAY[0].duration;

let adjustedDurationSeconds =
  totalRouteDurationINSeconds;

    if (distance <=100){
      adjustedDurationSeconds += 60*30;
    }else if(distance<=200){
      adjustedDurationSeconds += 2* 60*60;

    }else if(distance<=600){
      adjustedDurationSeconds += 4* 60*60;

    }
    else if(distance<=1200){
      adjustedDurationSeconds += 6* 60*60;

    }
      else if(distance<=1600){
      adjustedDurationSeconds += 10* 60*60;

    }

    else {
      adjustedDurationSeconds +=  10* 60*60;
    }

const duration = {
  hrs: Math.floor(adjustedDurationSeconds / 3600),
  min: Math.floor(
    (adjustedDurationSeconds % 3600) / 60
  )
};

    console.log(duration);
    


    const speed = (distance*60*60)/distanceAndDurationCoordinatesARRAY[0].duration
    // console.log("speed " + speed );
    
//eta generation with departure time give destination eta

/*
  const departureTime = new Date(`${date}T${time}:00`);
  
  const arrivalTime = new Date(
    departureTime.getTime() +
    (duration.hrs * 60 + duration.min) * 60 * 1000
  );
  
  const finalETA = arrivalTime.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  
  */
  const {finalETA} = getfinalETA(
    date,
    time,
    distance,
   adjustedDurationSeconds,
    
  )
  //..................................................................
  // finding checkpoints of major city/districts
  //.................................................................

    /*
  const maxCheckpoints = 15;
  
  let intervalKM = Math.ceil(distance / maxCheckpoints); 
  // console.log("intervalKM "+intervalKM)
  
  const numberOfCheckpoints = Math.floor(distance/intervalKM);
  // console.log("numberOfCheckpoints "+numberOfCheckpoints)
  
  const checkpointCoordinates = [];
  const checkpointDistanceKm =[];
    const checkpointTimeMinutes  = [];
    
    const allCoordinates = distanceAndDurationCoordinatesARRAY[0].coordinates;
    let allintervalKM = 0;
    let allintervalTIME =0;
    
    checkpointCoordinates.push(
      allCoordinates[0]
    )
    checkpointDistanceKm.push(0)
    checkpointTimeMinutes.push(0);
    
    const totalDurationMinutes =
    (distanceAndDurationCoordinatesARRAY[0].duration / 60) + 180; // your +3 hrs
    
    const intervalTimeMinutes =
    totalDurationMinutes / (numberOfCheckpoints + 1);
    
    let accumulatedTime = 0;
    
    
    //...........................................................................
    // calculating index of checkpoints by coordinates
    //...........................................................................
  for(let i = 1;i<=numberOfCheckpoints;i++){
    const lengthOfCoordinates =allCoordinates.length;
    
    const indexOfCheckpoints = Math.floor(
      (i * lengthOfCoordinates) /(numberOfCheckpoints + 1)
    );
    
    allintervalKM = allintervalKM + intervalKM ; 
    accumulatedTime += intervalTimeMinutes;
    
        
    checkpointCoordinates.push(
      allCoordinates[indexOfCheckpoints]
    )
    checkpointDistanceKm.push(
      allintervalKM
    )
    checkpointTimeMinutes.push(
      Math.round(accumulatedTime)
    )
    
    
  };
  
  checkpointCoordinates.push(
    allCoordinates[allCoordinates.length - 1]
  );
  
  checkpointDistanceKm.push(distance);
  
  checkpointTimeMinutes.push(
    Math.round(totalDurationMinutes)
  );
  

  console.log(checkpointCoordinates)
  console.log(checkpointDistanceKm)
  console.log( checkpointTimeMinutes)
  
*/

      const joiningCoordinatesWithDistance = generateCheckpoints(
        distanceAndDurationCoordinatesARRAY[0].duration,
        Math.floor(
          distanceAndDurationCoordinatesARRAY[0].distance / 1000
        ),
        distanceAndDurationCoordinatesARRAY[0].coordinates,
        date,   
        time    
      );  
  // console.log("joiningCoordinatesWithDistance");
  // console.log(joiningCoordinatesWithDistance);

 /*
  const joiningCoordinatesWithDistance = checkpointCoordinates.map(([lon,lat],index)=>({
    lon,
    lat,
    distanceKM : checkpointDistanceKm[index],
    timeMinutes: checkpointTimeMinutes[index],
  }))
  console.log(joiningCoordinatesWithDistance);
  
  */   
      

//...............................................................................
// Reverse geocode to find cities by coordinates
//...........................................................................
 
  const uniqueCities = await getreverseGeocode(
    joiningCoordinatesWithDistance,
    date,
    time,
    distance, 
    duration,
    finalETA,
  )


  /*
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
*/

          // console.log(uniqueCities);
          

          const weatherDATA = await getWeather(
            date,
            time,
            uniqueCities
          )
          // console.log(weatherDATA)
            const checkpointsWithWeather = uniqueCities.map(
              (checkpoint, index) => ({
                ...checkpoint,
                weather: weatherDATA[index] || null,
              })
            );    
           const weathersInYourRoute = {
            route:{
              start: from,
              destination:to,
              distance,
              duration,
              departureDate:date,
              departureTime:time,
              finalETA,
              
            },
            checkpoints:
              checkpointsWithWeather,
          }
          
    console.log(weathersInYourRoute);
    
      return res.status(200).json({weathersInYourRoute});
  } catch (error) {
  console.log("MESSAGE:", error.message);
  console.log(error.config?.url);

  return res.status(
    error.response?.status || 500
  ).json({
    error: error.response?.data || error.message,
  });
}
};

module.exports = {
  getTravelWeather,
};