package com.eventticketingsystemapi.mappers;

public interface Convert<Entity, Dto> {
    public Entity toEntity(Dto item);
    public Dto toDto(Entity item);
}

