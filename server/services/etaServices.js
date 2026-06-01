const getfinalETA =(
    date,
    time,
    distance,
    duration,
)=>{    
    const totalSeconds = duration + (3 * 3600);
    const durationHRSandMIN = {
      hrs: Math.floor(totalSeconds / 3600),
      min: Math.floor((totalSeconds % 3600) / 60)
    };
    const distanceInHRS = distance/1000
    const timeInMIN = duration/(60*60)
    const speed = distanceInHRS/timeInMIN;
    console.log("speed " + speed );
    const departureTime = new Date(`${date}T${time}:00`);

    const arrivalTime = new Date(
      departureTime.getTime() +
      totalSeconds * 1000
    );
    const finalETA =
    arrivalTime.toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    return{
        durationHRSandMIN,
        finalETA,
    }



}
module.exports= getfinalETA;