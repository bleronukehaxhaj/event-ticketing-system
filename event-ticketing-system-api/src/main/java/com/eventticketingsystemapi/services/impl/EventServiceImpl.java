package com.eventticketingsystemapi.services.impl;

import com.eventticketingsystemapi.dtos.EventDto;
import com.eventticketingsystemapi.dtos.EventPublishChangeDto;
import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.exceptions.EventNotFoundException;
import com.eventticketingsystemapi.exceptions.UserException;
import com.eventticketingsystemapi.mappers.EventMapper;
import com.eventticketingsystemapi.mappers.TicketMapper;
import com.eventticketingsystemapi.models.Event;
import com.eventticketingsystemapi.models.Ticket;
import com.eventticketingsystemapi.models.User;
import com.eventticketingsystemapi.repositories.BookedTicketRepository;
import com.eventticketingsystemapi.repositories.EventRepository;
import com.eventticketingsystemapi.repositories.UserRepository;
import com.eventticketingsystemapi.services.EventService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventMapper eventMapper;
    private final BookedTicketRepository bookedTicketRepository;
    private final TicketMapper ticketMapper;


    public EventServiceImpl(EventRepository eventRepository,
                            UserRepository userRepository,
                            EventMapper eventMapper,
                            BookedTicketRepository bookedTicketRepository,
                            TicketMapper ticketMapper) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.eventMapper = eventMapper;
        this.bookedTicketRepository = bookedTicketRepository;
        this.ticketMapper = ticketMapper;

    }

    @Override
    public void createEvent(EventDto eventDto, String authToken) {
        validateAuthToken(authToken);
        User user = userRepository.findByAuthToken(authToken)
                .orElseThrow(() -> new EntityNotFoundException("User not found for authToken: " + authToken));

        Event event = eventMapper.toEntity(eventDto);
        event.setUser(user);
        eventRepository.save(event);
    }

    @Override
    public void updateEvent(long id, EventDto updateEventDto, String authToken) {
        validateAuthToken(authToken);
        User user = userRepository.findByAuthToken(authToken)
                .orElseThrow(() -> new EntityNotFoundException("User not found for authToken: " + authToken));
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
        event.setName(updateEventDto.getName());
        event.setDescription(updateEventDto.getDescription());
        event.setEventCategory(updateEventDto.getEventCategory());
        event.setEventStatus(updateEventDto.getEventStatus());
        event.setStartDate(updateEventDto.getStartDate());
        event.setEndDate(updateEventDto.getEndDate());
        event.setCreatedDate(LocalDateTime.now());
        event.setLastUpdatedDate(LocalDateTime.now());
        event.setAddress(updateEventDto.getAddress());
        event.setOrganizer(updateEventDto.getOrganizer());
        event.setVenue(updateEventDto.getVenue());
        eventRepository.save(event);
    }

    @Override
    @Transactional
    public void deleteEventById(long id, String authToken) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
        if (event != null) {
            bookedTicketRepository.deleteBookedTicketByEvent(event);
            eventRepository.deleteById(id);
        }

    }

    @Override
    public EventDto getEventById(long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
        EventDto eventDto = eventMapper.toDto(event);
        return eventDto;
    }

    @Override
    public EventDto getUserEventById(long id, String authToken) {
        validateAuthToken(authToken);
        User user = userRepository.findByAuthToken(authToken)
                .orElseThrow(() -> new EntityNotFoundException("User not found for authToken: " + authToken));
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));

        EventDto eventDto = eventMapper.toDto(event);

        return eventDto;
    }

    @Override
    public List<EventDto> getAllEvents() {
        return eventRepository.findByPublishedIsTrue().stream().map(eventMapper::toDto).toList();
    }

    @Override
    public List<EventDto> getUserAllEvents(String authToken) {
        validateAuthToken(authToken);
        User user = userRepository.findByAuthToken(authToken)
                .orElseThrow(() -> new EntityNotFoundException("User not found for authToken: " + authToken));
        return eventRepository.findByUser(user).stream().map(eventMapper::toDto).toList();
    }

    @Override
    public List<Ticket> getAllEventTickets(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException("Event not found"));

        return event.getTickets();
    }
    @Override
    public void changePublishEvent(Long eventId, EventPublishChangeDto changeDto) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + eventId));

        event.setPublished(changeDto.isPublished());

        eventRepository.save(event);
    }


    private void validateAuthToken(String authToken) {
        if (authToken == null || authToken.isEmpty()) {
            throw new UserException("User not authenticated");
        }
    }
}
