import Seat from "./Seat";

export default class CinemaHall{
    //model sali kinowej który pozwoli mi dobrać się do konkretnego miejsca po indeksie zamiast przeszukiwac tablice
    //za każdym razem zeby dostac sie do cordsow.
    longestRow = 0;
    seats = [];
    constructor(seatsArray) {
        this.seats.push([]);
        seatsArray.forEach(seat=> {
            if (seat.cords.x >= this.seats.length) {
                this.seats.push([]);
            }
            if(seat.cords.y > this.longestRow)
                this.longestRow = seat.cords.y;
            this.seats[seat.cords.x][seat.cords.y] = seat;
        })
    }
    fillArrayWithNullSeats(){
        let temporary=[];
        for(let x=0;x<this.seats.length;x++){
            temporary.push([])
            for(let y=0;y<this.longestRow;y++){
                if(this.seats[x][y]) {
                    temporary[x].push({...this.seats[x][y],isNull:false})
                    continue
                }
                temporary[x].push({id:`s${x}${y}`,cords:{x,y},reserved:false,isNull:true})
            }
        }

        this.seats = temporary;
    }
}