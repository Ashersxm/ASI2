package com.cpe.springboot.message.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cpe.springboot.message.model.Message;
import com.cpe.springboot.message.repository.MessageRepository;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByRoomName(String roomName) {
        return messageRepository.findByRoomNameOrderByTimestampAsc(roomName);
    }

    public List<Message> getPrivateMessages(String roomName) {
        return messageRepository.findByRoomNameOrderByTimestampAsc(roomName);
    }
}