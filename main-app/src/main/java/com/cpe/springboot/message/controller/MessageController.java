package com.cpe.springboot.message.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cpe.springboot.message.model.Message;
import com.cpe.springboot.message.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    // Endpoint pour sauvegarder un message
    @PostMapping
    public Message saveMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    // Endpoint pour récupérer les messages d'une salle (générale ou privée)
    @GetMapping("/room/{roomName}")
    public List<Message> getMessagesByRoom(@PathVariable String roomName) {
        return messageService.getMessagesByRoomName(roomName);
    }
}