package com.JUMO.reservation.repository

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Reservation (
    @Id
    var PhoneNumber : String?=null,

    @Column
    var userName : String?=null,

    @Column
    var Password : String?=null,

    @Column
    var reservationDate : LocalDateTime?=null,

    @Column
    var Total : Int?=null,

    @Column
    var MenuList : List<Menu>?=null,

)