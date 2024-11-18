package com.cpe.springboot.Authentification.controller;

import com.cpe.springboot.Authentification.dto.AuthDto;
import com.cpe.springboot.Authentification.model.UserModel;
import com.cpe.springboot.Authentification.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping
    public Integer authenticateUser(@RequestBody AuthDto authDto) {
        // Recherche d'un utilisateur correspondant au login et mot de passe
        List<UserModel> uList = userService.getUserByLoginPwd(authDto.getLogin(), authDto.getPwd());

        // Si un utilisateur est trouvé, on retourne son ID
        if (uList.size() > 0) {
            return uList.get(0).getId();
        }
        
        // Si l'authentification échoue, lever une exception HTTP 403 (Forbidden)
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentication Failed");
    }
}