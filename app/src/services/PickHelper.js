import destructure2Darray from "./utilFunctions";
export default class PickHelper{
    seatCount = 1;
    near ;
    seatsMatrix = [];
    seatsSelected = [];
    constructor(count,near,seatsMatrix) {
        this.seatCount = count;
        this.near = near;
        this.seatsMatrix = destructure2Darray(seatsMatrix);
        //chcę kopie macierzy zeby móc podmieniac wartosci
    }

    initializeForUserChoice(){
        let subsequentAvaibleSeat  = [];
        this.seatsMatrix.forEach((row,rowIndex)=>{
            subsequentAvaibleSeat = []
            row.forEach((seat,seatIndex)=>{
                if(seat.reserved === false){
                    subsequentAvaibleSeat.push(seat);
                }
                else {
                    if (subsequentAvaibleSeat.length >= this.near) {
                        this.makeThoseSeatsRecommended(subsequentAvaibleSeat)
                    }
                    subsequentAvaibleSeat = [];
                }
            })
        })
    }
    makeThoseSeatsRecommended(seatsArray){
        seatsArray.forEach(seat=>{
            let newSeat = {...seat, recommended: true };
            this.seatsMatrix[seat.cords.x][seat.cords.y] = newSeat;
        })
    }

}