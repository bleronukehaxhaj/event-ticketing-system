package com.eventticketingsystemapi.controllers;

import com.eventticketingsystemapi.dtos.BookedTicketDto;
import com.eventticketingsystemapi.services.impl.BookedTicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/booked-tickets")
public class BookedTicketController {

    private final BookedTicketService bookedTicketService;

    public BookedTicketController(BookedTicketService bookedTicketService) {
        this.bookedTicketService = bookedTicketService;
    }

    @PostMapping("/{eventId}/{ticketId}")
    public ResponseEntity<?> saveBookedTicket(@PathVariable Long eventId, @PathVariable Long ticketId,
                                              @RequestBody BookedTicketDto bookedTicketDto) {
        bookedTicketService.saveBookedTicket(eventId,ticketId,bookedTicketDto);
        return ResponseEntity.ok("Success booked");
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<BookedTicketDto>> getAllBookedTicketsForEvent(@PathVariable Long eventId) {
        List<BookedTicketDto> bookedTickets = bookedTicketService.getAllBookedTicketsForEvent(eventId);
        return ResponseEntity.ok(bookedTickets);
    }
}
