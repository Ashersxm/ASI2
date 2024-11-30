package cpe.controller;

import cpe.model.ImageModel;
import cpe.model.RequestDao;
import cpe.service.BusService;
import cpe.service.ImageGenerationService;
import cpe.service.BusListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import cpe.config.*;
import cpe.model.*;
import cpe.service.*;

@RestController
@RequestMapping("/api/messages")
public class ImageController {

    @Autowired
    private BusService busService;

    @Autowired
    private ImageGenerationService imageGenerationService;

    @Autowired
    private RequestDao requestDao;

    @PostMapping("/send")
    public String sendMessage(@RequestBody ImageModel imageModel) {
        busService.sendMsg(imageModel.getPromptTxt(), imageModel.getNegativePromptTxt());
        return "Message sent successfully";
    }

    @PostMapping("/sendToBus")
    public String sendMessageToBus(@RequestBody ImageModel imageModel, @RequestParam String busName) {
        busService.sendMsgBus(imageModel.getPromptTxt(), imageModel.getNegativePromptTxt(), busName);
        return "Message sent to bus successfully";
    }

    @GetMapping("/generateImage")
    public ResponseEntity<Map<String, String>> generateImage(@RequestParam String busName) {
        ImageModel lastReceivedMessage = BusListener.getLastReceivedMessage(busName);
        if (lastReceivedMessage == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No message received for bus: " + busName));
        }
        String promptTxt = lastReceivedMessage.getPromptTxt();
        String negativePromptTxt = lastReceivedMessage.getNegativePromptTxt();
        String imageUrl = imageGenerationService.generateImage(promptTxt, negativePromptTxt);
        Map<String, String> response = new HashMap<>();
        response.put("imageUrl", imageUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/requests")
    public List<ImageModel> getRequests() {
        return requestDao.getRequests();
    }

    @GetMapping("/readMessages")
    public ResponseEntity<List<ImageModel>> readMessages(@RequestParam String busName) {
        ConcurrentLinkedQueue<ImageModel> messages = BusListener.getMessagesForBus(busName);
        return ResponseEntity.ok(List.copyOf(messages));
    }
}
