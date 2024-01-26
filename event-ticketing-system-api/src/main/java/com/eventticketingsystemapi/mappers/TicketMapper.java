package com.eventticketingsystemapi.mappers;

import com.eventticketingsystemapi.dtos.TicketDto;
import com.eventticketingsystemapi.models.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TicketMapper extends Convert<Ticket, TicketDto> {
    TicketMapper MAPPER = Mappers.getMapper(TicketMapper.class);
}
