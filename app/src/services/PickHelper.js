import destructure2Darray from "../services/utilFunctions";
import Seat from "../models/Seat";
function isSeatGroupBigEnough(userCount,seatGroup,near,){
    if(near === true) {
        if (seatGroup.length >= userCount) {
            return true;
        }
        else return false
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
function seatExistAndMeetCondition(seat){
    if(typeof seat === "object")
        if(seat.meetUserCondition)
            return true;
    return false
}
function addRecToBothEnds(leftSeat,rightSeat,picksLeft){
    for(let j=1;j<=picksLeft;j++){
        const XCORD = leftSeat.cords.x;
        const YCORD = leftSeat.cords.y - j;
        if(seatExistAndMeetCondition(this.seatsMatrix[XCORD][YCORD])){
            this.seatsMatrix[XCORD][YCORD].rec = true;
        }
        else break;
    }
    for(let j=1;j<=picksLeft;j++){
        const XCORD = rightSeat.cords.x;
        const YCORD = rightSeat.cords.y + j ;
        if(seatExistAndMeetCondition(this.seatsMatrix[XCORD][YCORD])){
            this.seatsMatrix[XCORD][YCORD].rec = true;
        }
        else break;
    }
}
function addRecBetweenSeats(leftSeat,rightSeat){
    const row = leftSeat.cords.x;
    let leftCord = leftSeat.cords.y;
    let rightCord = rightSeat.cords.y;
    for(let i=leftCord;i<=rightCord;i++){
        this.seatsMatrix[row][i].rec = true;
    }
}
export default class PickHelper{
    longestRow;
    seatCount = 1;
    near ;
    initiallyAvailable =[];
    seatsMatrix = [];
    seatsSelected = [];
    picksLeft;
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
                if(typeof this.seatsMatrix[x][y]=="object") {
                    temporary[x][y] = {...this.seatsMatrix[x][y],isNull:false}
                    continue
                }
                temporary[x][y] = {...new Seat({x, y}, false), isNull: true}
            }
        }
        this.seatsMatrix = temporary;
    };
    setRecommendedSeats(){
        if(!(this.seatsSelected.length>0)||!(this.near)){
            this.initiallyAvailable.forEach((seat)=>{
                seat.rec = true
            });
        }
        else {
            this.assist(this.seatsSelected)
        }
        this.picksLeft = this.seatCount - this.seatsSelected.length;
    }
    initializeForUserChoice(seatCount,near){
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
                if(seat.selected == true)
                    this.seatsSelected.push(seat)
            })
        })
        return this.seatsMatrix;

    }
    assist(selectedSeatsArray){
        let leftSeat = selectedSeatsArray[0];
        let rightSeat = selectedSeatsArray[0];
        selectedSeatsArray.forEach((seat)=>{
            seat.rec = true;
            if(seat.cords.y < leftSeat.cords.y){
                leftSeat = seat;
            }
            if(seat.cords.y > rightSeat.cords.y){
                rightSeat = seat;
            }
        })
        let picksLeft = this.seatCount - selectedSeatsArray.length;
        let seatsBetween = rightSeat.cords.y - leftSeat.cords.y - 1;
        let selectedBetween = selectedSeatsArray.length - 2;
        let requiredSeatsBetween = seatsBetween - selectedBetween;

        if(requiredSeatsBetween > 0){
            addRecBetweenSeats.call(this,leftSeat,rightSeat);
            picksLeft = picksLeft - requiredSeatsBetween;
        }
        addRecToBothEnds.call(this,leftSeat,rightSeat,picksLeft);

    }
    selectSeat(seatCords){
        this.seatsMatrix[seatCords.cordx][seatCords.cordy].selected = true;
        console.log(this.seatsMatrix[seatCords.cordx][seatCords.cordy]);
    }


}