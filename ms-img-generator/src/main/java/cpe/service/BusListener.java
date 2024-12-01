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

@Service
public class BusListener {

    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private RequestDao requestDao;

    // Structure de données partagée pour stocker les messages reçus par canal ESB
    private static final ConcurrentHashMap<String, ConcurrentLinkedQueue<ImageModel>> receivedMessages = new ConcurrentHashMap<>();

    @JmsListener(destination = "TEST", containerFactory = "jmsListenerContainerFactory")
    public void receiveMessageResult(ImageModel request, Message message) {
        System.out.println("[BUSLISTENER] [CHANNEL TEST] RECEIVED MSG=[" + request + "]");
        requestDao.addRequest(request);
        receivedMessages.computeIfAbsent("TEST", k -> new ConcurrentLinkedQueue<>()).add(request);
        displayMessagesInQueue("TEST");
    }

    public static ImageModel getLastReceivedMessage(String busName) {
        ConcurrentLinkedQueue<ImageModel> queue = receivedMessages.get(busName);
        return (queue != null) ? queue.poll() : null;
    }

    public static ConcurrentLinkedQueue<ImageModel> getMessagesForBus(String busName) {
        return receivedMessages.getOrDefault(busName, new ConcurrentLinkedQueue<>());
    }

    public void displayMessagesInQueue(String busName) {
        ConcurrentLinkedQueue<ImageModel> queue = receivedMessages.get(busName);
        if (queue != null && !queue.isEmpty()) {
            System.out.println("Messages in queue for bus " + busName + ":");
            for (ImageModel message : queue) {
                System.out.println("PromptTxt: " + message.getPromptTxt() + ", NegativePromptTxt: " + message.getNegativePromptTxt());
            }
        } else {
            System.out.println("No messages in queue for bus " + busName);
        }
    }
}
