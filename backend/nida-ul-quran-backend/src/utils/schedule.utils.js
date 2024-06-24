const makeScheduleObj = (startDate,endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    return {
    "weekday":start.getDay(),
    "startHour": start.getHours(),
    "startMinute": start.getMinutes(),
    "endHour":end.getHours(),
    "endMinute":end.getMinutes()
    } 
}

module.exports = {
    makeScheduleObj
}