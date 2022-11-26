package com.JUMO.reservation.repository

import javax.persistence.*

@Entity
class Restaurant (
    @Id
    var restaurantName : String?=null,

    @Column
    var startTime : String?=null,

    @Column
    var endTime : String?=null

)