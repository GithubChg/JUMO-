package com.JUMO.reservation.repository

import javax.persistence.*

@Entity
class Menu (
    @Id
    var MenuName : String?=null,

    @Column
    var price : Int?=null,

    @Column
    var description : String?=null,

    @Column
    var allergy : String?=null,

    @Column
    var stock : Int?=null
)