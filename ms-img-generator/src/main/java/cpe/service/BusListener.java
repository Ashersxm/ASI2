package cpe.service;

import cpe.model.RequestDao;
import cpe.model.ImageRequest;
import jakarta.jms.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class BusListener {

    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private RequestDao requestDao;

    @JmsListener(destination = "RESULT_BUS_MNG", containerFactory = "connectionFactory")
    public void receiveMessageResult(ImageRequest request, Message message) {
        System.out.println("[BUSLISTENER] [CHANNEL RESULT_BUS_MNG] RECEIVED MSG=[" + request + "]");
        requestDao.addRequest(request);
    }

    @JmsListener(destination = "A", containerFactory = "connectionFactory")
    public void receiveMessageA(ImageRequest request, Message message) {
        System.out.println("[BUSLISTENER] [CHANNEL A] RECEIVED MSG=[" + request + "]");
        requestDao.addRequest(request);
    }

    @JmsListener(destination = "B", containerFactory = "connectionFactory")
    public void receiveMessageB(ImageRequest request, Message message) {
        System.out.println("[BUSLISTENER] [CHANNEL B] RECEIVED MSG=[" + request + "]");
        requestDao.addRequest(request);
    }
}
