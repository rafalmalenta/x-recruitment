export default class PickHelper{
    seatCount;
    near = 1;
    seatsMatrix = [];
    seatsSelected = [];
    constructor(count,near,seatsMatrix) {
        this.seatCount = count;
        this.near = near;
        seatsMatrix.forEach((row,i)=>{
            this.seatsMatrix.push([]);
            this.seatsMatrix[i] = [ ...row ]
            })
    }

    checkSeats(){
        let subsequentAvaibleSeat = [];
        this.seatsMatrix.forEach((row,rowIndex)=>{
            row.forEach((seat,seatIndex)=>{

                if(seat.reserved == false){
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
        console.log("bcvb",subsequentAvaibleSeat);
    }
    makeThoseSeatsRecommended(array){
        array.forEach(seat=>{
            let newSeat = {...seat, recommended: true };
            this.seatsMatrix[seat.cords.x][seat.cords.y] = newSeat;
        })
    }

}