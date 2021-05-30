export default function destructure2Darray(array){
    let temp = [];
    array.forEach((row,i)=>{
        temp.push([]);
        row.forEach((seat,index)=>{
            temp[i].push({...seat,cords:{...seat.cords}});
        })
    })
    return temp
}