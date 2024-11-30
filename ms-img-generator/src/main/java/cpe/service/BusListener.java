package cpe.service;

import cpe.model.RequestDao;
import cpe.model.ImageModel;
import jakarta.jms.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import cpe.config.*;
import cpe.controller.*;
import cpe.model.*;


@Service
public class BusListener {

    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private RequestDao requestDao;

    // Structure de données partagée pour stocker les messages reçus par canal ESB
    private static final ConcurrentHashMap<String, ConcurrentLinkedQueue<ImageModel>> receivedMessages = new ConcurrentHashMap<>();

    @JmsListener(destination = "RESULT_BUS_MNG", containerFactory = "jmsListenerContainerFactory")
    public void receiveMessageResult(ImageModel request, Message message) {
        System.out.println("[BUSLISTENER] [CHANNEL RESULT_BUS_MNG] RECEIVED MSG=[" + request + "]");
        requestDao.addRequest(request);
        receivedMessages.computeIfAbsent("RESULT_BUS_MNG", k -> new ConcurrentLinkedQueue<>()).add(request);
    }

    public static ImageModel getLastReceivedMessage(String busName) {
        ConcurrentLinkedQueue<ImageModel> queue = receivedMessages.get(busName);
        return (queue != null) ? queue.poll() : null;
    }

    public static ConcurrentLinkedQueue<ImageModel> getMessagesForBus(String busName) {
        return receivedMessages.getOrDefault(busName, new ConcurrentLinkedQueue<>());
    }
}
