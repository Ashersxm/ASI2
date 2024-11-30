package cpe.service;

import cpe.model.ImageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import cpe.config.*;
import cpe.controller.*;
import cpe.model.*;

@Service
public class BusService {

    private final JmsTemplate jmsTemplate;

    @Autowired
    public BusService(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendMsg(String promptTxt, String negativePromptTxt) {
        System.out.println("[BUSSERVICE] SEND String MSG=[" + promptTxt + negativePromptTxt + "]");
        jmsTemplate.convertAndSend("test", promptTxt + negativePromptTxt);
    }

    public void sendMsgBus(String promptTxt, String negativePromptTxt, String busName) {
        ImageModel imageModel = new ImageModel(promptTxt, negativePromptTxt);
        System.out.println("[BUSSERVICE] SEND ImageModel MSG=[" + imageModel + "] to Bus=[" + busName + "]");
        jmsTemplate.convertAndSend(busName, imageModel);
    }
}
