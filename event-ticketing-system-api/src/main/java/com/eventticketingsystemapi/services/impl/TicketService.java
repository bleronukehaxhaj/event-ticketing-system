package com.eventticketingsystemapi.services.impl;

import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.exceptions.EventNotFoundException;
import com.eventticketingsystemapi.mappers.TicketMapper;
import com.eventticketingsystemapi.models.Event;
import com.eventticketingsystemapi.models.Ticket;
import com.eventticketingsystemapi.repositories.EventRepository;
import com.eventticketingsystemapi.repositories.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final TicketMapper ticketMapper;

    public TicketService(TicketRepository ticketRepository, EventRepository eventRepository, TicketMapper ticketMapper) {
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.ticketMapper = ticketMapper;
    }



    public void addTicketToEvent(Long eventId, TicketDto ticketDto) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        Ticket ticket = ticketMapper.toEntity(ticketDto);
        ticket.setEvent(event);


        ticketRepository.save(ticket);
    }


    public void updateTicket(Long ticketId, TicketDto updatedTicketDto) {

        Ticket oldTicket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));

        oldTicket.setTicketType(updatedTicketDto.getTicketType());
        oldTicket.setCapacity(updatedTicketDto.getCapacity());
        oldTicket.setPrice(updatedTicketDto.getPrice());

        ticketRepository.save(oldTicket);
    }



    public void deleteTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found"));
        ticketRepository.deleteById(ticketId);
    }

    public List<Ticket> getAllEventTickets(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException("Event not found"));

        return event.getTickets();
    }
}
