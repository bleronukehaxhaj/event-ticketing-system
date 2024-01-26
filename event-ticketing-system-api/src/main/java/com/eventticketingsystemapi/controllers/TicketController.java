package com.eventticketingsystemapi.controllers;

import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.services.impl.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/{eventId}")
    public ResponseEntity<String> addTicketToEvent(
            @PathVariable Long eventId,
            @RequestBody TicketDto ticketDto) {
        ticketService.addTicketToEvent(eventId, ticketDto);
        return new ResponseEntity<>("Ticket added to event successfully", HttpStatus.OK);
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<String> updateTicket(
            @PathVariable Long ticketId,
            @RequestBody TicketDto updatedTicketDto) {
        ticketService.updateTicket(ticketId,updatedTicketDto);
        return new ResponseEntity<>("Ticket updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("{ticketId}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long ticketId) {
        ticketService.deleteTicket(ticketId);
        return new ResponseEntity<>("Ticket deleted successfully", HttpStatus.OK);
    }
}