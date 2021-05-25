export default class CinemaHall{
    //model sali kinowej który pozwoli mi dobrać się do konkretnego miejsca po indeksie zamiast przeszukiwac tablice
    //za każdym razem zeby dostac sie do cordsow.
    longestRow;
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
}