package main.java.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/images")
public class ImgGenRestController {

    @Autowired
    private ImgGenRestController imageGenerationService;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateImage(@RequestParam("prompt") String prompt) {
        byte[] image = imageGenerationService.generateImage(prompt);
        return ResponseEntity.ok().body(image);
    }
}
