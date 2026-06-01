const generateCheckpoints  =(
    duration,
    distance,
    coordinates,
)=>{
    const maxCheckpoints = 15;

      let intervalKM = Math.ceil(distance / maxCheckpoints); 
          console.log("intervalKM "+intervalKM)

    const numberOfCheckpoints = Math.floor(distance/intervalKM);
        console.log("numberOfCheckpoints "+numberOfCheckpoints)

    let allintervalKM = 0;
    let allintervalTIME =0;
    const checkpointCoordinates = [];
    const checkpointDistanceKm =[];
    const checkpointTimeMinutes  = [];
    
    checkpointCoordinates.push(
      coordinates[0]
    )
    checkpointDistanceKm.push(0)
    checkpointTimeMinutes.push(0);

    const totalDurationMinutes =
  (duration / 60) + 180; // your +3 hrs

    const intervalTimeMinutes =
      totalDurationMinutes / (numberOfCheckpoints + 1);

    let accumulatedTime = 0;


//...........................................................................
// calculating index of checkpoints by coordinates
//...........................................................................

    for(let i = 1;i<=numberOfCheckpoints;i++){
      const lengthOfCoordinates =coordinates.length;
      
        const indexOfCheckpoints = Math.floor(
          (i * lengthOfCoordinates) /(numberOfCheckpoints + 1)
        );
        
        allintervalKM = allintervalKM + intervalKM ; 
        accumulatedTime += intervalTimeMinutes;


        checkpointCoordinates.push(
          coordinates[indexOfCheckpoints]
        )
        checkpointDistanceKm.push(
          allintervalKM
        )
        checkpointTimeMinutes.push(
          Math.round(accumulatedTime)
        )

        
      };
      
        checkpointCoordinates.push(
          coordinates[coordinates.length - 1]
        );

        checkpointDistanceKm.push(distance);

        checkpointTimeMinutes.push(
          Math.round(totalDurationMinutes)
        );
    
      // console.log(checkpointCoordinates)
      // console.log(checkpointDistanceKm)
      // console.log( checkpointTimeMinutes)
        
      const joiningCoordinatesWithDistance = checkpointCoordinates.map(([lon,lat],index)=>({
        lon,
        lat,
        distanceKM : (checkpointDistanceKm[index]),
        timeMinutes: checkpointTimeMinutes[index],
      }))

      return joiningCoordinatesWithDistance

      
};
module.exports = generateCheckpoints ;