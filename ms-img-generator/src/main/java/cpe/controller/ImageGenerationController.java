package cpe.controller;

import cpe.model.ImageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cpe.service.ImageGenerationService;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "*") // Permettre toutes les origines
public class ImageGenerationController {

    @Autowired
    private ImageGenerationService imageGenerationService;

    @PostMapping("/generateImg")
    public ResponseEntity<String> generateImage(@RequestBody ImageRequest imageRequest) {
        String imageResponse = Arrays.toString(new String[]{imageGenerationService.generateImage(imageRequest.getPromptTxt(), imageRequest.getNegativePromptTxt())});
        return ResponseEntity.ok(imageResponse);
    }
}
