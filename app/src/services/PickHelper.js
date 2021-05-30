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
    const leftCord = leftSeat.cords.y;
    const rightCord = rightSeat.cords.y;
    for(let i=leftCord;i<=rightCord;i++){
        this.seatsMatrix[row][i].rec = true;
    }
}
export default class PickHelper{
    seatCount = 1;
    near ;
    initiallyAvailable =[];
    seatsMatrix = [];
    seatsSelected = [];
    picksLeft;
    constructor(seatCount, near, seatsMatrix, initiallyAvailable, seatsSelected) {
        this.seatCount = seatCount;
        this.near = near;
        this.seatsMatrix = seatsMatrix;
        this.initiallyAvailable = initiallyAvailable;
        this.seatsSelected = seatsSelected;
    }
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


}