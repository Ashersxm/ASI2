package cpe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class ImageGenerationService {

    @Autowired
    private RestTemplate restTemplate;

    public String generateImage(String promptTxt, String negativePromptTxt) {
        String url = "http://localhost:8080/fake/prompt/req";  // URL of the container

        // Create the request body
        String requestBody = String.format("{\"promptTxt\":\"%s\", \"negativePromptTxt\":\"%s\"}", promptTxt, negativePromptTxt);

        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        // Create the entity (with headers and body)
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Make the POST request to the container and wait for the response
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        // Return the response body (the generated image URL or data)
        return response.getBody();
    }
}
