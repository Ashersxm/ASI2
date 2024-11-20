package cpe.service;

import cpe.model.ImageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class BusService {

    @Autowired
    JmsTemplate jmsTemplate;

    public void sendMsg(String promptTxt, String negativePromptTxt) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+promptTxt+negativePromptTxt+"]");
        jmsTemplate.convertAndSend("RESULT_BUS_MNG",promptTxt+negativePromptTxt);
    }

    public void sendMsg(String promptTxt, String negativePromptTxt, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+promptTxt+negativePromptTxt+"] to Bus=["+busName+"]");
        jmsTemplate.convertAndSend(busName,promptTxt+negativePromptTxt);
    }
}
