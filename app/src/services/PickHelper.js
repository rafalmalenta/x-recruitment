import destructure2Darray from "./utilFunctions";
function isSeatGroupBigEnough(userCount,seatGroup,near,){
    if(near == true){
        if(seatGroup.length>=userCount)
            return true;
        }
    else if(seatGroup.length>0)
        return true
    return false;
}
function setGroupAvaibleIfMeetConditions(userCount,seatGroup,near){
    if (isSeatGroupBigEnough(userCount,seatGroup,near,)){
        makeThoseSeatsRecommended.call(this,seatGroup);
    }
}
function makeThoseSeatsRecommended(seatsArray){
    seatsArray.forEach(seat=>{
        let newSeat = {...seat, meetUserCondition: true };
        this.seatsMatrix[seat.cords.x][seat.cords.y] = newSeat;
    })
}
export default class PickHelper{
    seatCount = 1;
    near ;
    seatsMatrix = [];
    seatsSelected = [];
    constructor(count,near,seatsMatrix) {
        this.seatCount = count;
        this.near = near;
        this.seatsMatrix = seatsMatrix;
        //this.seatsMatrix = destructure2Darray(seatsMatrix)
    }

    initializeForUserChoice(){

        this.seatsMatrix.forEach((row,rowIndex)=>{
            let subsequentAvaibleSeat = []
            row.forEach((seat,seatIndex)=>{
                if((seat.reserved === false)&&(seat.isNull != true)){
                    subsequentAvaibleSeat.push(seat);
                }
                else {
                    setGroupAvaibleIfMeetConditions.call(this,this.seatCount,subsequentAvaibleSeat,this.near);
                    subsequentAvaibleSeat = [];
                }
                if(seatIndex == row.length-1){
                    setGroupAvaibleIfMeetConditions.call(this,this.seatCount,subsequentAvaibleSeat,this.near);
                    subsequentAvaibleSeat = [];
                }
            })
        })
        return this.seatsMatrix;
    }
    makeThoseSeatsRecommended(seatsArray){
        seatsArray.forEach(seat=>{
            let newSeat = {...seat, meetUserCondition: true };
            this.seatsMatrix[seat.cords.x][seat.cords.y] = newSeat;
        })
    }

}