package com.cpe.asi2.ms_logger.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {

    private static final Logger logger = LoggerFactory.getLogger(LoggerService.class);

    public void logMessage(String message) {
        logger.info("Logged message: {}");
    }
}