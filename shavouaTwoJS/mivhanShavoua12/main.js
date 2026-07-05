import { catchData } from "./data.js";
import { carDone,carWaiting,carsInRace,nextCar, data, findNAmeByCarID} from "./utils.js";


const main = async () => {
    console.log("Pit Stop Queue - Race Team Management System  ")
    console.log("Race engineer: Let's check the current queue status on the pit wall.\n")
    console.log(" Loading queue data... \n ")
    console.log(" ========== PIT STOP QUEUE ==========  " )
    const allData = await data()
    console.log(`Race : ${allData.raceName}`)
    console.log(`Lap : ${allData.currentLap}/${allData.totalLaps}`)
    const carDoneAction = await carDone()
    console.log("Pit stops completed : ", carDoneAction)

    const carWaitingAction = await carWaiting()
    console.log("\n Cars waiting for pit stop :  ")
    for (const car of carWaitingAction){console.log(
        `-Car #${car.carNumber} | Driver:${car.driverName}`)}
    const nextCarAction = await nextCar()
    console.log("\n Next car to enter the pit : \n ", 
        "CAR",nextCarAction.carNumber,"| Driver",nextCarAction.driverName
    )
    console.log("=============================================================")

    console.log("Radio message to car :#",nextCarAction.carNumber , "Box box box,",nextCarAction.driverName , "pit the lap \n")

    console.log("--Search for a car by number --")
    const validId =  await findNAmeByCarID(44)
    console.log(validId)
    const notValidID = await findNAmeByCarID(99)
    console.log(notValidID,"\n")

    console.log("Process completed successfully. The pit wall is up to date.")




    

}

main()