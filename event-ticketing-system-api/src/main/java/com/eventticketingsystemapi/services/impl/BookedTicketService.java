package com.eventticketingsystemapi.services.impl;

import com.eventticketingsystemapi.dtos.BookedTicketDto;
import com.eventticketingsystemapi.mappers.BookedTicketMapper;
import com.eventticketingsystemapi.models.BookedTicket;
import com.eventticketingsystemapi.repositories.BookedTicketRepository;
import com.eventticketingsystemapi.repositories.EventRepository;
import com.eventticketingsystemapi.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookedTicketService {

    private final BookedTicketRepository bookedTicketRepository;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private final BookedTicketMapper bookedTicketMapper;

    public BookedTicketService(BookedTicketRepository bookedTicketRepository, EventRepository eventRepository, TicketRepository ticketRepository, BookedTicketMapper bookedTicketMapper) {
        this.bookedTicketRepository = bookedTicketRepository;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.bookedTicketMapper = bookedTicketMapper;
    }

    public void saveBookedTicket(Long eventId, Long ticketId, BookedTicketDto bookedTicketDto) {
        var event = eventRepository.findById(eventId);
        var ticket = ticketRepository.findById(ticketId);
        BookedTicket bookedTicket = bookedTicketMapper.toEntity(bookedTicketDto);
        bookedTicket.setEvent(event.get());
        bookedTicket.setTicket(ticket.get());
        bookedTicketRepository.save(bookedTicket);

    }


    public List<BookedTicketDto> getAllBookedTicketsForEvent(Long eventId) {
        return bookedTicketRepository.findByEventId(eventId)
                .stream()
                .map(bookedTicketMapper::toDto).toList();
    }

}
