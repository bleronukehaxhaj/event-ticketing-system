package com.eventticketingsystemapi.dtos;

import com.eventticketingsystemapi.enums.EventCategory;
import com.eventticketingsystemapi.enums.EventStatus;
import com.eventticketingsystemapi.models.Address;
import com.eventticketingsystemapi.models.Organizer;
import com.eventticketingsystemapi.models.Ticket;
import com.eventticketingsystemapi.models.Venue;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class EventDto {
    private Long id;
    private String name;
    private String description;
    private EventCategory eventCategory;
    private EventStatus eventStatus;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean published;
    private Address address;
    private Organizer organizer;
    private Venue venue;
    private List<Ticket> tickets;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EventCategory getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(EventCategory eventCategory) {
        this.eventCategory = eventCategory;
    }

    public EventStatus getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(EventStatus eventStatus) {
        this.eventStatus = eventStatus;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Organizer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Organizer organizer) {
        this.organizer = organizer;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}
