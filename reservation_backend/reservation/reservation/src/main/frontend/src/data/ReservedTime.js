import axios from 'axios';
import TimeList from './TimeList';

const ReservedTime = new Array(7);

axios({
    url: "/api/readReservationList",
    method: 'post',
    baseUrl: "http://localhost:8080"
}).then((res) => {
    const data = res.data.reservationList
    for (var k = 0; k<ReservedTime.length; k++) {
        ReservedTime[k] = new Array(TimeList.length).fill(0);
    }

    const ls = []
    for (var i=0; i<data.length; i++) {
        ls.push({
            date: data[i].reservationDate.substr(0,10),
            time: TimeList.indexOf(data[i].reservationDate.substr(11))
        })
    }

    console.log(ls)

    if (data) {
        const ls = []
        for (var i=0; i<data.length; i++) {
            ls.push({
                date: data[i].reservationDate.substr(0,10),
                time: TimeList.indexOf(data[i].reservationDate.substr(11))
            })
        }
        console.log(ls)

        const dateNow = new Date();
        const today = dateNow.getFullYear()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getDate();
        const now = new Date(today.slice(0,4), today.slice(5,7), today.slice(8,10));
        for (var j=0; j<ls.length; j++) {
            const selected = new Date(ls[j].date.slice(0,4), ls[j].date.slice(5,7), ls[j].date.slice(8,10))
            const diff = selected.getTime() - now.getTime()
            ReservedTime[diff/(1000 * 60 * 60 * 24)][ls[j].time] = 1
        }
    }
    console.log(ReservedTime)
})

// const ReservedTime = [
//     [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], 0일뒤
//     [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0], 1일뒤
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 2일뒤
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 3일뒤
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 4일뒤
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 5일뒤
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 6일뒤
// ];

export default ReservedTime;