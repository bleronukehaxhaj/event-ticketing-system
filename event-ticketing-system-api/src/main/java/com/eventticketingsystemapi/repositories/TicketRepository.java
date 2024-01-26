package com.eventticketingsystemapi.repositories;

import com.eventticketingsystemapi.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket,Long>{
}
