export default function destructure2Darray(array){
    let temp = [];
    array.forEach((row,i)=>{
        temp.push([]);
        temp[i] = [ ...row ]
    })
    return temp
}