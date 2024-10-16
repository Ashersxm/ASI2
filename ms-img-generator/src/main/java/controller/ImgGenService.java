package main.java.controller;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@Service
public class ImgGenService {

    @Autowired
    private ImgGenService imageServiceClient;

    public byte[] generateImage(String prompt) {
        ResponseEntity<byte[]> response = imageServiceClient.generateImage(prompt);
        return response.getBody();
    }
}
