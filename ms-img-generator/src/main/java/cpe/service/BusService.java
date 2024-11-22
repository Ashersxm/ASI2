package cpe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class BusService {

    private final JmsTemplate jmsTemplate;

    @Autowired
    public BusService(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendMsg(String promptTxt, String negativePromptTxt) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+promptTxt+negativePromptTxt+"]");
        jmsTemplate.convertAndSend("test",promptTxt+negativePromptTxt);
    }

    public void sendMsgBus(String promptTxt, String negativePromptTxt, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+promptTxt+negativePromptTxt+"] to Bus=["+busName+"]");
        jmsTemplate.convertAndSend(busName,promptTxt+negativePromptTxt);
    }
}
