package cpe.controller;

import cpe.model.PropertyRequest;
import cpe.service.PropertyGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/properties")
public class PropertyGenerationController {

    @Autowired
    private PropertyGenerationService propertyGenerationService;

    @PostMapping("/generateProperty")
    public ResponseEntity<String> generateProperty(@RequestBody PropertyRequest propertyRequest) {
        String propertyResponse = Arrays.toString(new String[]{propertyGenerationService.generateProperty(propertyRequest.getPromptTxt(), propertyRequest.getNegativePromptTxt())});
        return ResponseEntity.ok(propertyResponse);
    }
}
