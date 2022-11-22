package com.JUMO.reservation.repository

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Restaurant (
    @Id
    var RestaurantName : String?=null,

    @Column
    var start_time : LocalDateTime?=null,

    @Column
    var end_time : LocalDateTime?=null,

)