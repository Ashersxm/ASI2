package cpe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TextGenerationService {

    @Autowired
    private RestTemplate restTemplate;

    public String generateProperty(String promptTxt, String negativePromptTxt) {
        String url = "http://localhost:11434/api/generate";  // Updated URL for property generation

        // Create the request body
        String requestBody = String.format(
                "{\"model\":\"qwen2:0.5b\", \"prompt\":\"%s\", \"stream\":false}",
                promptTxt
        );

        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        // Create the entity (with headers and body)
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Make the POST request to the property generation service
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // Return the response body (the generated property data)
        return response.getBody();
    }
}
