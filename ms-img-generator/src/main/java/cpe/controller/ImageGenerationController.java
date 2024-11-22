package cpe.controller;

import cpe.model.ImageRequest;
import cpe.model.RequestDao;
import cpe.service.BusService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cpe.service.ImageGenerationService;
import cpe.service.BusService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
public class ImageGenerationController {

    @Autowired
    private ImageGenerationService imageGenerationService;

    @PostMapping("/generateImg")
    public ResponseEntity<String> generateImage(@RequestBody ImageRequest imageRequest) {
        busService.sendMsg(imageRequest.getPromptTxt(), imageRequest.getNegativePromptTxt());
        String imageResponse = Arrays.toString(new String[]{imageGenerationService.generateImage(imageRequest.getPromptTxt(), imageRequest.getNegativePromptTxt())});
        return ResponseEntity.ok(imageResponse);
    }
    ////////////////////////
    @Autowired
    BusService busService;

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg")
    public boolean sendInform(@RequestBody ImageRequest imageRequest) {
        busService.sendMsg(imageRequest.getPromptTxt(), imageRequest.getNegativePromptTxt());
        return true;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sendmsg/{busName}")
    public boolean sendInform(@RequestBody ImageRequest imageRequest, @PathVariable String busName) {
        busService.sendMsgBus(imageRequest.getPromptTxt(), imageRequest.getNegativePromptTxt(),busName);
        return true;
    }

    @Autowired
    RequestDao requestDao;

    @RequestMapping(method = RequestMethod.GET, value = "/request")
    public List<ImageRequest> sendInform() {
        return requestDao.getAllRequest();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public List<RequestDao> getAllUsers() {
        List<RequestDao> uDTOList = new ArrayList<>();
        for (UserModel uM : userService.getAllUsers()) {
            uDTOList.add(DTOMapper.fromUserModelToUserDTO(uM));
        }
        return uDTOList;
    }


}
