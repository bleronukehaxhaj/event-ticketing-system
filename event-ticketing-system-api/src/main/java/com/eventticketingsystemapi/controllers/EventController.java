package com.eventticketingsystemapi.controllers;

import com.eventticketingsystemapi.dtos.EventDto;
import com.eventticketingsystemapi.dtos.EventPublishChangeDto;
import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.exceptions.EventNotFoundException;
import com.eventticketingsystemapi.models.Ticket;
import com.eventticketingsystemapi.services.EventService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;


    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/user")
    public ResponseEntity<List<EventDto>> getUserAllEvents(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(eventService.getUserAllEvents(authorizationHeader));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(eventService.getEventById(id));
        } catch (EventNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserEventById(@PathVariable Long id,
                                              @RequestHeader("Authorization") String authorizationHeader) {
        try {
            return ResponseEntity.ok(eventService.getUserEventById(id, authorizationHeader));
        } catch (EventNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody EventDto eventDto,
                                              @RequestHeader("Authorization") String authorizationHeader) {
        try {
            eventService.createEvent(eventDto, authorizationHeader);
            return ResponseEntity.ok("Event created successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable Long id,
                                              @RequestBody EventDto updatedEvent,
                                              @RequestHeader("Authorization") String authorizationHeader) {
        try {
            eventService.updateEvent(id, updatedEvent, authorizationHeader);
            return ResponseEntity.ok("Event updated successfully");
        } catch (EventNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id,
                                              @RequestHeader("Authorization") String authorizationHeader) {
        try {
            eventService.deleteEventById(id, authorizationHeader);
            return ResponseEntity.ok("Event deleted successfully");
        } catch (EventNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    @GetMapping("/{eventId}/tickets")
    public ResponseEntity<List<Ticket>> getAllEventTickets(@PathVariable Long eventId) {
        List<Ticket> eventTickets = eventService.getAllEventTickets(eventId);
        return new ResponseEntity<>(eventTickets, HttpStatus.OK);
    }

    @PatchMapping("/{eventId}")
    public ResponseEntity<String> publishEvent(@PathVariable Long eventId, @RequestBody EventPublishChangeDto changeDto) {
        eventService.changePublishEvent(eventId, changeDto);
        return ResponseEntity.ok("Event published successfully");
    }

}
