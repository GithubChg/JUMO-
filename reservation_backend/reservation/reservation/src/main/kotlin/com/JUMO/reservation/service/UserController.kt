package com.JUMO.reservation.service

import com.JUMO.reservation.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.io.IOException


@RestController
@RequestMapping("")
class UserController {

    @GetMapping("/api/hello")
    fun test(): String? {
        return "Hello, world!"
    }

    @PostMapping("/api/hellopost")
    @Throws(IOException::class)
    fun postTest(@RequestBody vo: VO): String {
        if(vo.equals(null)) {
            println("null값 전달됨");
        } else {
            println("성공! ${vo}");
        }
        return "통신 성공"
    }

    @Autowired
    private val menuRepository: MenuRepository? = null

    @Autowired
    private val reservationRepository: ReservationRepository? = null

    @PostMapping("/api/createReservation")
    @Throws(IOException::class)
    fun createReservation(@RequestBody vo: VO): String {
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber
        var userName=vo.userName
        var password=vo.password
        var reservationDate=vo.reservationDate
        var reserveMenu=vo.reserveMenu
        var numPeople=vo.numPeople
        var total=vo.total

        //같은 전화번호의 예약이 있는지 확인하고 없으면 예약 생성
        var duplicated=reservationRepository!!.findById(phoneNumber!!)
        
        if(!(duplicated.isPresent())) {
            var targetReservation= Reservation()
//            var menuList=reserveMenu!!.split(",")

            //가격 계산
//            for(i in menuList){
//                total+=menuRepository!!.findById(i).get().price!!
//            }

            targetReservation.phoneNumber=phoneNumber
            targetReservation.userName=userName
            targetReservation.password=password
            targetReservation.reservationDate=reservationDate
            targetReservation.total=total
            targetReservation.reserveMenu=reserveMenu
            targetReservation.numPeople=numPeople


            reservationRepository!!.save(targetReservation)
            returnJSON="createReservation_success"
        }
        else{
            returnJSON="createReservation_fail"
        }


        return returnJSON
    }

    @PostMapping("/api/readReservation")
    @Throws(IOException::class)
    fun readReservation(@RequestBody vo: VO): String{
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber

        var duplicated=reservationRepository!!.findById(phoneNumber!!)

        if((duplicated.isPresent())) {
            var userName=duplicated.get().userName
            var password=duplicated.get().password
            var reservationDate=duplicated.get().reservationDate
            var total=duplicated.get().total
            var reserveMenu=duplicated.get().reserveMenu
            var numPeople=duplicated.get().numPeople
            returnJSON= "{"+"\"data\":{"+"\"phoneNumber\" : \""+duplicated.get().phoneNumber+"\",\"numPeople\" : \""+duplicated.get().numPeople+"\",\"userName\" : \""+duplicated.get().userName+"\",\"password\" : \""+duplicated.get().password+"\",\"reservationDate\" : \""+duplicated.get().reservationDate+"\",\"reserveMenu\" : \""+duplicated.get().reserveMenu+"\",\"total\" : \""+duplicated.get().total+"\"},"+"\"message\" : \""+"readReservation_success"+"\"}"
        }
        else{
            returnJSON="readReservation_fail"
        }


        return returnJSON
    }

    @PostMapping("/api/updateReservation")
    @Throws(IOException::class)
    fun updateReservation(@RequestBody vo: VO): String{
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber
        var userName=vo.userName
        var password=vo.password
        var reservationDate=vo.reservationDate
        var reserveMenu=vo.reserveMenu
        var numPeople=vo.numPeople
        var total= vo.total

        //같은 전화번호의 예약이 있는지 확인하고 있으면 수정
        var duplicated=reservationRepository!!.findById(phoneNumber!!)


        if(duplicated.isPresent()) {
            var targetReservation= duplicated.get()
//            var menuList=reserveMenu!!.split(",")

//            //가격 계산
//            for(i in menuList){
//                println(i)
//                total+=menuRepository!!.findById(i).get().price!!
//            }

            targetReservation.phoneNumber=vo.phoneNumber
            targetReservation.userName=vo.userName
            targetReservation.password=vo.password
            targetReservation.reservationDate=vo.reservationDate
            targetReservation.total=total
            targetReservation.reserveMenu=reserveMenu
            targetReservation.numPeople=numPeople



            reservationRepository!!.save(targetReservation)
            returnJSON="updateReservation_success"
        }
        else{
            returnJSON="updateReservation_fail"
        }


        return returnJSON
    }

    @PostMapping("/api/deleteReservation")
    @Throws(IOException::class)
    fun deleteReservation(@RequestBody vo: VO): String{
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber

        var duplicated=reservationRepository!!.findById(phoneNumber!!)

        if((duplicated.isPresent())) {
            var targetReservation= duplicated.get()
            reservationRepository!!.delete(targetReservation)
            returnJSON="deleteReservation_success"
        }
        else{
            returnJSON="deleteReservation_fail"
        }


        return returnJSON
    }

    @PostMapping("/api/readReservationList")
    @Throws(IOException::class)
    fun readReservationList(): String{
        var retunJSON = "{\"reservationList\" : ["
        val allReservation= reservationRepository!!.findAll()

        for (reservations in allReservation) {
            retunJSON += "{\"phoneNumber\" : \"" + reservations.phoneNumber + "\","
            retunJSON+="\"userName\" : \""+reservations.userName+"\","
            retunJSON+="\"password\" : \""+reservations.password+"\","
            retunJSON+="\"reservationDate\" : \""+reservations.reservationDate+"\","
            retunJSON+="\"total\" : \""+reservations.total+"\","
            retunJSON+="\"numPeople\" : \""+reservations.numPeople+"\","
            retunJSON += "\"reserveMenu\" : \"" + reservations.reserveMenu + "\"},"

        }
        retunJSON = retunJSON.substring(0, retunJSON.length - 1)
        retunJSON += "]}"

        return retunJSON
    }

    @PostMapping("/api/verifyUser")
    @Throws(IOException::class)
    fun verifyUser(@RequestBody vo: VO): String {
        var returnJSON = ""
        var userName=vo.userName
        var password=vo.password
        var phoneNumber = ""
        val allReservation= reservationRepository!!.findAll()
        var verify=false
        for(reservations in allReservation){
            if((reservations.userName==userName)&&(reservations.password==password)) {
                verify=true
                phoneNumber = reservations.phoneNumber.toString()
            }
        }
        if(verify) {
            // true면 전화번호 반환
            returnJSON=phoneNumber
        }
        else{
            // false면 다른거 반환
            returnJSON="NULL"
        }
        return returnJSON
    }
}