package com.eventticketingsystemapi.mappers;

import com.eventticketingsystemapi.dtos.EventDto;
import com.eventticketingsystemapi.models.Event;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface EventMapper extends Convert<Event, EventDto> {
    EventMapper MAPPER = Mappers.getMapper(EventMapper.class);
}
