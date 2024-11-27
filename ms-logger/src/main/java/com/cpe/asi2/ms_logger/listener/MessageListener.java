package com.cpe.asi2.ms_logger.listener;

import com.cpe.asi2.ms_logger.service.LoggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {
    @Autowired
    private LoggerService loggerService;

    @JmsListener(destination = "example-queue")
    public void receiveMessage(String message) {
        loggerService.logMessage(message);
    }
}
