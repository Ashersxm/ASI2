package com.cpe.springboot.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.AuthDTO;
import com.cpe.springboot.user.model.UserDTO;    
import com.cpe.springboot.user.model.UserModel;
import com.cpe.springboot.user.controller.UserService;
import com.cpe.springboot.user.controller.MessageSender;


@CrossOrigin
@RestController
public class UserRestController {

    private final UserService userService;
    private final MessageSender messageSender;

    @Autowired
    public UserRestController(UserService userService, MessageSender messageSender) {
        this.userService = userService;
        this.messageSender = messageSender;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public List<UserDTO> getAllUsers() {
        List<UserDTO> uDTOList = new ArrayList<>();
        for (UserModel uM : userService.getAllUsers()) {
            uDTOList.add(DTOMapper.fromUserModelToUserDTO(uM));
        }
        return uDTOList;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public UserDTO getUser(@PathVariable String id) {
        Optional<UserModel> ruser = userService.getUser(id);
        if (ruser.isPresent()) {
            return DTOMapper.fromUserModelToUserDTO(ruser.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User id:" + id + ", not found", null);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/user")
    public UserDTO addUser(@RequestBody UserDTO user) {
        UserDTO newUser = userService.addUser(user);
        
        // Envoi de notification via ActiveMQ après l'ajout de l'utilisateur
        messageSender.sendMessage("userId");
		System.out.println("user");
        return newUser;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/{id}")
    public UserDTO updateUser(@RequestBody UserDTO user, @PathVariable String id) {
        user.setId(Integer.valueOf(id));
        UserDTO updatedUser = userService.updateUser(user);

        // Envoi de notification via ActiveMQ après la mise à jour de l'utilisateur
        messageSender.sendMessage("userUpdate");

        return updatedUser;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/user/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);

        // Envoi de notification via ActiveMQ après la suppression de l'utilisateur
        messageSender.sendMessage("userDelete");
    }

    @RequestMapping(method = RequestMethod.POST, value = "/auth")
    public Integer authenticate(@RequestBody AuthDTO authDto) {
        List<UserModel> uList = userService.getUserByLoginPwd(authDto.getUsername(), authDto.getPassword());
        if (uList.size() > 0) {
            return uList.get(0).getId();
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentification Failed", null);
    }
}
