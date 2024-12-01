package cpe.controller;

import cpe.model.TextRequest;
import cpe.service.TextGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/properties")
public class TextGenerationController {

    @Autowired
    private TextGenerationService propertyGenerationService;

    @PostMapping("/generateProperty")
    public ResponseEntity<String> generateProperty(@RequestBody TextRequest textRequest) {
        String propertyResponse = Arrays.toString(new String[]{propertyGenerationService.generateProperty(textRequest.getPromptTxt(), textRequest.getNegativePromptTxt())});
        return ResponseEntity.ok(propertyResponse);
    }
}
