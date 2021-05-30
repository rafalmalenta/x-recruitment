import Seat from "../models/Seat";
import PickHelper from "./PickHelper";
function isSeatGroupBigEnough(userCount,seatGroup,near,){
    if(near === true) {
        return seatGroup.length >= userCount;
    }
    else if(seatGroup.length>0) {
        return true
    }
    return false;
}
function setGroupAvailableIfMeetConditions(userCount,seatGroup,near){
    if (isSeatGroupBigEnough(userCount,seatGroup,near)){
        makeThoseSeatsRecommended.call(this,seatGroup);
    }
}
function makeThoseSeatsRecommended(seatsArray){
    seatsArray.forEach(seat=>{
        this.initiallyAvailable.push(seat);
        this.seatsMatrix[seat.cords.x][seat.cords.y].meetUserCondition = true;
    })
}

export default class HelperInitializer{
    longestRow;
    seatCount = 1;
    near ;
    initiallyAvailable =[];
    seatsMatrix = [];
    seatsSelected = [];
    constructor(count,near,seatsMatrix,longestRow) {
        this.seatCount = count;
        this.near = near;
        this.longestRow = longestRow;
        this.seatsMatrix = seatsMatrix;
    }
    fillArrayWithNullSeats(){
        let temporary = []
        for(let x=0;x<this.seatsMatrix.length;x++){
            temporary.push([])
            for(let y=0;y<this.longestRow;y++){
                if(typeof this.seatsMatrix[x][y]==="object") {
                    console.log("arrr",this.seatsMatrix[x][y]);
                    temporary[x][y] = {...this.seatsMatrix[x][y],isNull:false}
                    continue
                }
                temporary[x][y] = {...new Seat({x, y}, false), isNull: true}
            }
        }
        this.seatsMatrix = temporary;

    };
    initializeForUserChoice(seatCount,near){
        this.fillArrayWithNullSeats();
        this.seatsMatrix.forEach((row)=>{
            let subsequentAvailableSeat = []
            row.forEach((seat,seatIndex)=>{
                if((seat.reserved === false)&&(seat.isNull !== true)){
                    subsequentAvailableSeat.push(seat);
                }
                else {
                    setGroupAvailableIfMeetConditions.call(this,seatCount,subsequentAvailableSeat,near);
                    subsequentAvailableSeat = [];
                }
                if(seatIndex === row.length-1){
                    setGroupAvailableIfMeetConditions.call(this,seatCount,subsequentAvailableSeat,near);
                    subsequentAvailableSeat = [];
                }
                if(seat.selected === true)
                    this.seatsSelected.push(seat)
            })
        })
        return new PickHelper(this.seatCount,this.near,this.seatsMatrix,this.initiallyAvailable,this.seatsSelected);

    }
}