import axios from 'axios';

var TimeList = [];

axios({
    url: "/api/readRestaurant",
    method: 'post',
    baseUrl: "http://localhost:8080"
}).then((res) => {
    console.log("통신 성공")
    console.log(res.data.data)
    const startHour = res.data.data.startTime.substr(0,2)
    const startMinute = res.data.data.startTime.substr(3,2)
    const endHour = res.data.data.endTime.substr(0,2)
    const endMinute = res.data.data.endTime.substr(3,2)

    for (var i=startHour; i<=endHour; i++) {
        if(i===endHour && startMinute===30 && endMinute===0) {
            continue
        } 
        if(i<12) {
            TimeList.push("오전 "+i+":"+startMinute)
        } else if(i>12) {
            TimeList.push("오후 "+(i-12)+":"+startMinute)
        } else {
            TimeList.push("오후 "+i+":"+startMinute)
        }
    }
    
    console.log({"TimeList": TimeList})
})

// const TimeList = [
//     "오전 10:00", "오전 11:00", "오후 12:00", "오후 1:00", "오후 2:00", "오후 3:00",
//     "오후 4:00", "오후 5:00", "오후 6:00", "오후 7:00", "오후 8:00", "오후 9:00", 
// ];

export default TimeList;