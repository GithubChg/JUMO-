package com.JUMO.reservation.service

import com.JUMO.reservation.repository.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.IOException


@RestController
@RequestMapping("")
class UserController {

    @Autowired
    private val menuRepository: MenuRepository? = null

    @Autowired
    private val reservationRepository: ReservationRepository? = null

    @PostMapping("/createReservation")
    @Throws(IOException::class)
    fun createReservation(@RequestBody vo: VO): String {
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber
        var userName=vo.userName
        var password=vo.password
        var reservationDate=vo.reservationDate
        var reserveMenu=vo.reserveMenu
        var numPeople=vo.numPeople
        var total=0

        //같은 전화번호의 예약이 있는지 확인하고 없으면 예약 생성
        var duplicated=reservationRepository!!.findById(phoneNumber!!)
        
        if(!(duplicated.isPresent())) {
            var targetReservation= Reservation()
            var menuList=reserveMenu!!.split(",")

            //가격 계산
            for(i in menuList){
                total+=menuRepository!!.findById(i).get().price!!
            }

            targetReservation.phoneNumber=vo.phoneNumber
            targetReservation.userName=vo.userName
            targetReservation.password=vo.password
            targetReservation.reservationDate=vo.reservationDate
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

    @PostMapping("/readReservation")
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

    @PostMapping("/updateReservation")
    @Throws(IOException::class)
    fun updateReservation(@RequestBody vo: VO): String{
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber
        var userName=vo.userName
        var password=vo.password
        var reservationDate=vo.reservationDate
        var reserveMenu=vo.reserveMenu
        var numPeople=vo.numPeople
        var total=0

        //같은 전화번호의 예약이 있는지 확인하고 있으면 수정
        var duplicated=reservationRepository!!.findById(phoneNumber!!)

        if(duplicated.isPresent()) {
            var targetReservation= duplicated.get()
            var menuList=reserveMenu!!.split(",")

            //가격 계산
            for(i in menuList){
                println(i)
                total+=menuRepository!!.findById(i).get().price!!
            }

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

    @PostMapping("/deleteReservation")
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

    @PostMapping("/readReservationList")
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

    @PostMapping("/verifyUser")
    @Throws(IOException::class)
    fun verifyUser(@RequestBody vo: VO): String {
        var returnJSON = ""
        var phoneNumber=vo.phoneNumber
        var userName=vo.userName
        var password=vo.password
        val allReservation= reservationRepository!!.findAll()
        var verify=false
        for(reservations in allReservation){
            if((reservations.phoneNumber==phoneNumber)&&(reservations.userName==userName)&&(reservations.password==password))
                verify=true
        }

        if(verify) {

            returnJSON="verifyUser_success"
        }
        else{
            returnJSON="verifyUser_fail"
        }


        return returnJSON

    }
}