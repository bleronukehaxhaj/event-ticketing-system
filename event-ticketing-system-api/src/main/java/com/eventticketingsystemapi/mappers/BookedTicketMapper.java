package com.eventticketingsystemapi.mappers;

import com.eventticketingsystemapi.dtos.BookedTicketDto;
import com.eventticketingsystemapi.models.BookedTicket;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BookedTicketMapper extends Convert<BookedTicket, BookedTicketDto> {
    BookedTicketMapper MAPPER = Mappers.getMapper(BookedTicketMapper.class);
}
