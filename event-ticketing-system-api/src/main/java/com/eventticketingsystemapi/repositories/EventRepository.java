package com.eventticketingsystemapi.repositories;

import com.eventticketingsystemapi.models.Event;
import com.eventticketingsystemapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser(User user);
    List<Event> findByPublishedIsTrue();

}
