package com.JUMO.reservation.repository

import javax.persistence.*

@Entity
class Reservation (
    @Id
    var phoneNumber : String?=null,

    @Column
    var userName : String?=null,

    @Column
    var password : String?=null,

    @Column
    var reservationDate : String?=null,

    @Column
    var total : Int?=null,

    @Column
    var numPeople : Int?=null,
    @Column
    var reserveMenu : String?=null

)