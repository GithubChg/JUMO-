package com.JUMO.reservation.repository

import org.springframework.data.repository.CrudRepository

interface ReservationRepository : CrudRepository<Reservation, String>