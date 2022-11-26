package com.JUMO.reservation.service

import com.JUMO.reservation.repository.Menu
import com.JUMO.reservation.repository.MenuRepository
import com.JUMO.reservation.repository.VO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.IOException

//createReservation ()
//readReservation
//updateReservation
//deleteReservation


@RestController
@RequestMapping("")
class ManagerController {

    @Autowired
    private val menuRepository: MenuRepository? = null

    @PostMapping("/createMenu")
    @Throws(IOException::class)
    fun createMenu(@RequestBody vo: VO): String {
        var returnJSON = ""
        var menuName=vo.menuName
        var price=vo.price
        var description=vo.description
        var allergy=vo.allergy
        var stock=vo.stock
        var imageLocation=vo.imageLocation

        var duplicated=menuRepository!!.findById(menuName!!)

        if(!(duplicated.isPresent())) {
            var targetMenu= Menu()
            targetMenu.menuName=vo.menuName
            targetMenu.price=vo.price
            targetMenu.description=vo.description
            targetMenu.allergy=vo.allergy
            targetMenu.stock=vo.stock
            targetMenu.imageLocation=vo.imageLocation
            menuRepository!!.save(targetMenu)
            returnJSON="createMenu_success"
        }
        else{
            returnJSON="createMenu_fail"
        }


        return returnJSON
    }

    @PostMapping("/readMenu")
    @Throws(IOException::class)
    fun readMenu(@RequestBody vo: VO): String{
        var returnJSON = ""
        var menuName=vo.menuName

        var duplicated=menuRepository!!.findById(menuName!!)

        if((duplicated.isPresent())) {
            var price=duplicated.get().price
            var description=duplicated.get().description
            var allergy=duplicated.get().allergy
            var stock=duplicated.get().stock
            var imageLocation=duplicated.get().imageLocation
            returnJSON= "{"+"\"data\":{"+"\"price\" : \""+duplicated.get().price+"\",\"description\" : \""+duplicated.get().description+"\",\"allergy\" : \""+duplicated.get().allergy+"\",\"stock\" : \""+duplicated.get().stock+"\",\"menuName\" : \""+duplicated.get().menuName+"\",\"imageLocation\" : \""+duplicated.get().imageLocation+"\"},"+"\"message\" : \""+"readMenu_success"+"\"}"
        }
        else{
            returnJSON="readMenu_fail"
        }


        return returnJSON
    }

    @PostMapping("/updateMenu")
    @Throws(IOException::class)
    fun updateMenu(@RequestBody vo: VO): String{
        var returnJSON = ""
        var oldMenuName=vo.oldMenuName
        var price=vo.price
        var description=vo.description
        var allergy=vo.allergy
        var stock=vo.stock
        var imageLocation=vo.imageLocation

        var duplicated=menuRepository!!.findById(oldMenuName!!)

        if((duplicated.isPresent())) {
            var targetMenu= duplicated.get()
            targetMenu.price=vo.price
            targetMenu.description=vo.description
            targetMenu.allergy=vo.allergy
            targetMenu.stock=vo.stock
            targetMenu.imageLocation=vo.imageLocation
            menuRepository!!.save(targetMenu)
            returnJSON="updateMenu_success"
        }
        else{
            returnJSON="updateMenu_fail"
        }


        return returnJSON
    }

    @PostMapping("/deleteMenu")
    @Throws(IOException::class)
    fun deleteMenu(@RequestBody vo: VO): String{
        var returnJSON = ""
        var menuName=vo.menuName

        var duplicated=menuRepository!!.findById(menuName!!)

        if((duplicated.isPresent())) {
            var targetMenu= duplicated.get()
            menuRepository!!.delete(targetMenu)
            returnJSON="deleteMenu_success"
        }
        else{
            returnJSON="deleteMenu_fail"
        }


        return returnJSON
    }

    @PostMapping("/readMenuList")
    @Throws(IOException::class)
    fun readMenuList(): String{
        var retunJSON = "{\"menuList\" : ["
        val allMenu= menuRepository!!.findAll()

        for (menus in allMenu) {
                retunJSON += "{\"menuName\" : \"" + menus.menuName + "\","
                retunJSON+="\"price\" : \""+menus.price+"\","
                retunJSON+="\"description\" : \""+menus.description+"\","
                retunJSON+="\"allergy\" : \""+menus.allergy+"\","
                retunJSON+="\"stock\" : \""+menus.stock+"\","
                retunJSON += "\"imageLocation\" : \"" + menus.imageLocation + "\"},"

        }
        retunJSON = retunJSON.substring(0, retunJSON.length - 1)
        retunJSON += "]}"
        return retunJSON
    }
}