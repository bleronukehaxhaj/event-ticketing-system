package com.eventticketingsystemapi.services;

import com.eventticketingsystemapi.dtos.EventDto;
import com.eventticketingsystemapi.dtos.EventPublishChangeDto;
import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.models.Ticket;


import java.util.List;


public interface EventService {
    void createEvent(EventDto eventDto, String authToken);

    void updateEvent(long id, EventDto updateEventDto, String authToken);

    void deleteEventById(long id, String authToken);

    EventDto getEventById(long id);

    EventDto getUserEventById(long id, String authToken);

    List<EventDto> getAllEvents();

    List<EventDto> getUserAllEvents(String authToken);

    List<Ticket> getAllEventTickets(Long eventId);

    void changePublishEvent(Long eventId, EventPublishChangeDto changeDto);
}
