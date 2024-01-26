package com.eventticketingsystemapi.repositories;

import com.eventticketingsystemapi.models.BookedTicket;
import com.eventticketingsystemapi.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedTicketRepository extends JpaRepository<BookedTicket, Long> {
    List<BookedTicket> findByEventId(Long eventId);
    void deleteBookedTicketByEvent(Event event);
}
