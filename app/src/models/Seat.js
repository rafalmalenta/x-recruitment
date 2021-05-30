export default class Seat{
    id;
    cords;
    reserved;
    //meetUserCondition;
    //isNull;
    constructor(cords,reserved) {
        this.id = `s${cords.x}${cords.y}`;//zgodnie z przyjętą konwencją
        this.cords = cords;
        this.reserved = reserved;
        //this.meetUserCondition = meetUserCondition;
        //this.isNull = isNull
    }
}