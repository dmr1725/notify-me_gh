// https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php
const moment = require('moment')
const getDate = () =>{
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd=`0${dd}`;
    } 

    if(mm<10) 
    {
        mm=`0${mm}`;
    } 
    today = `${yyyy}-${mm}-${dd}`;
    return today
}

const getHour = () =>{
    var time = new Date();
    
    return parseInt(time.toLocaleString('en-US', { hour: 'numeric', hour12: true }))
    
}

const oneHourFromNow = (hour)=>{
    if(hour === 12){
         hour = 0
         return hour + 1
    }

    return hour + 1

}

module.exports = {
    getDate,
    getHour,
    oneHourFromNow

}