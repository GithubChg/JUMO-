package com.JUMO.reservation.repository

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Manager (
       @Id
        var managerId : String ?= null,

       @Column
        var managerPw: String ?= null
)