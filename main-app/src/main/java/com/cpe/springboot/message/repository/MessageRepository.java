package com.cpe.springboot.message.repository;

import com.cpe.springboot.message.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoomNameOrderByTimestampAsc(String roomName);
    List<Message> findByRoomNameAndSenderOrRoomNameAndReceiverOrderByTimestampAsc(
        String roomName1, 
        String sender, 
        String roomName2, 
        String receiver
    );
}