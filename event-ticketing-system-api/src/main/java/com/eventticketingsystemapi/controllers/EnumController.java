package com.eventticketingsystemapi.controllers;

import com.eventticketingsystemapi.enums.EventCategory;
import com.eventticketingsystemapi.enums.EventStatus;
import com.eventticketingsystemapi.enums.TicketType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/events")
public class EnumController {
    @GetMapping("/event-status")
    public List<EventStatus> getAllEventStatus() {
        return List.of(EventStatus.values());
    }

    @GetMapping("/event-category")
    public List<EventCategory> getAllEventCategories() {
        return List.of(EventCategory.values());
    }

    @GetMapping("/ticket-type")
    public List<TicketType> getAllTicketTypes() {
        return List.of(TicketType.values());
    }
}
