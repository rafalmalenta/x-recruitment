
export default class CinemaHall{
    //model sali kinowej który pozwoli mi dobrać się do konkretnego miejsca po indeksie zamiast przeszukiwac tablice
    //za każdym razem zeby dostac sie do cordsow.
    longestRow = 0;
    seatsMatrix = [];
    initiallyAvailable= [];
    constructor(seatsArray) {
        this.seatsMatrix.push([]);
        seatsArray.forEach(seat=> {
            if (seat.cords.x >= this.seatsMatrix.length) {
                this.seatsMatrix.push([]);
            }
            if(seat.cords.y > this.longestRow)
                this.longestRow = seat.cords.y;
            this.seatsMatrix[seat.cords.x][seat.cords.y] = seat;
        })
        })
    }

}